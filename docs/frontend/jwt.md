# jwt 单点登录

[什么是 jwt](https://jwt.io/) 
### 环境与依赖
node v10.16.0、base64url、fs

```js
const crypto = require('crypto'),
  base64url = require('base64url'),
  fs = require('fs'),
  pub = fs.readFileSync('./rsa.pub'),
  pri = fs.readFileSync('./rsa'),
  http = require('http')

function getToken(payload) {
  let header = {
    alg: 'RS256',
    typ: 'JWT',
  }
  header = base64url(JSON.stringify(header))
  payload = base64url(JSON.stringify(payload))
  const originData = header + '.' + payload //对其sha256值进行加密
  const sign = crypto.createSign('SHA256')
  sign.write(originData)
  sign.end()
  const sn = sign.sign(pri, 'base64')
  return originData + '.' + base64url.fromBase64(sn)
}

//权限鉴定
function verifyAuth(token) {
  tmp = token.split('.')
  header = tmp[0]
  payload = tmp[1]
  sn = base64url.decode(tmp[2], 'base64') //
  const originData = header + '.' + payload
  const verify = crypto.createVerify('SHA256')
  verify.write(originData)
  verify.end()
  const res = verify.verify(pub, sn, 'base64') //签名校验

  if (res) {
    let token = JSON.parse(base64url.decode(payload))
    let expired = Math.floor(Date.now()) - token.exp > 0
    if (expired) return '0'
    return token
  } else {
    return false
  }
}

http
  .createServer((req, res) => {
    //浏览器跨域
    res.writeHead(200, {
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
      'Access-Control-Max-Age': '600',
    })
    const { headers, url, method } = req
    if (url === '/login') {
      let token = getToken({
        exp: Math.floor(Date.now()) + 5000, //token 5s 有效期
        role: 'admin',
      })
      res.write(token)
    } else if (url === '/getImg') {
      let auth = headers.authorization
      let info = null
      console.log(headers)
      if (auth) {
        auth = auth.split(' ')[1]
        info = verifyAuth(auth)
      }
      if (!info) {
        res.write('permession denied!')
      } else if (info === '0') {
        res.write('out time')
      } else {
        if (info.role === 'admin') {
          res.write('hello admin')
        } else {
          res.write('welcome')
        }
      }
    }
    res.end()
  })
  .listen(8000)
```
