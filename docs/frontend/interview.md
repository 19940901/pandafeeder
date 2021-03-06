# 常用知识点

熟悉 JavaScript，掌握 ES6 常用新特性；
熟练使用 Vue.js 进行开发，熟悉 vuex、vue-router，了解服务端渲染 nuxt.js，了解 Vue3.0;
熟悉响应式布局，熟练使用 rem、flex 布局进行不同页面的适配;

工作经历

项目描述：xxx 银行 App 的信用卡模块、缴费模块，包含信用卡申请、信用卡还款、信用卡积分、手机充值、水电煤气缴费等。该项目为 Vue+Webpack 构建的单页面应用，通过JsBridge与Native通信。
主要职责：

- 参与手机银行7.0项目升级的主要功能开发
- 引入 axios 、 axios-mock-adapter 工具，减轻了对后端 mock 数据的依赖，提升了开发效率
- 针对长列表页面，通过监听 scroll 事件结合 computed 计算属性实现 recycle-view，解决部分低性能终端因 DOM 节点过多导致卡顿、白屏的问题
- 封装常用的业务组件，并通过 slot 插槽增加组件的可拓展性
- 

项目描述：浦发银行 App 的转账模块，包含转账记录查询、转账交易页面等，该项目主要基于jQuery开发。
主要职责：

- 负责转账模块的开发与维护；
- 对代码进行重构与优化，封装常用的功能函数，减少代码体积，提高代码可读性；
- 使用 jQuery、juicer 模板引擎，将页面中的不同模块进行拆分，使用模块化工具 Sea.js 按需加载，减少页面加载时间

工作

### 1，如何适配手机浏览器和 web 页面。(这个主要考虑 flex 布局和 rem 布局)

- js 根据页面的宽度动态设置根元素的字体大小

```js
!(function () {
  var a =
      '@charset "utf-8";html{color:#000;background:#fff;overflow-y:scroll;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}html *{outline:0;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}html,body{font-family:sans-serif}body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td,hr,button,article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{margin:0;padding:0}input,select,textarea{font-size:100%}table{border-collapse:collapse;border-spacing:0}fieldset,img{border:0}abbr,acronym{border:0;font-variant:normal}del{text-decoration:line-through}address,caption,cite,code,dfn,em,th,var{font-style:normal;font-weight:500}ol,ul{list-style:none}caption,th{text-align:left}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:500}q:before,q:after{content:\'\'}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}a:hover{text-decoration:underline}ins,a{text-decoration:none}',
    b = document.createElement('style')
  if ((document.getElementsByTagName('head')[0].appendChild(b), b.styleSheet))
    b.styleSheet.disabled || (b.styleSheet.cssText = a)
  else
    try {
      b.innerHTML = a
    } catch (c) {
      b.innerText = a
    }
})()
!(function (a, b) {
  function c() {
    var b = f.getBoundingClientRect().width
    var c = (b / 750) * 100
    ;(f.style.fontSize = c + 'px'), (k.rem = a.rem = c)
  }
  var d,
    e = a.document,
    f = e.documentElement,
    g = e.querySelector('meta[name="viewport"]'),
    h = e.querySelector('meta[name="flexible"]'),
    i = 0,
    j = 0,
    k = b.flexible || (b.flexible = {})
  if (g) {
    var l = g.getAttribute('content').match(/initial\-scale=([\d\.]+)/)
    l && ((j = parseFloat(l[1])), (i = parseInt(1 / j)))
  } else if (h) {
    var m = h.getAttribute('content')
    if (m) {
      var n = m.match(/initial\-dpr=([\d\.]+)/),
        o = m.match(/maximum\-dpr=([\d\.]+)/)
      n && ((i = parseFloat(n[1])), (j = parseFloat((1 / i).toFixed(2)))),
        o && ((i = parseFloat(o[1])), (j = parseFloat((1 / i).toFixed(2))))
    }
  }
  if (!i && !j) {
    var p =
        (a.navigator.appVersion.match(/android/gi),
        a.navigator.appVersion.match(/iphone/gi)),
      q = a.devicePixelRatio
    ;(i = p
      ? q >= 3 && (!i || i >= 3)
        ? 3
        : q >= 2 && (!i || i >= 2)
        ? 2
        : 1
      : 1),
      (j = 1 / i)
  }
  if ((f.setAttribute('data-dpr', i), !g))
    if (
      ((g = e.createElement('meta')),
      g.setAttribute('name', 'viewport'),
      g.setAttribute(
        'content',
        'initial-scale=' +
          j +
          ', maximum-scale=' +
          j +
          ', minimum-scale=' +
          j +
          ', user-scalable=no'
      ),
      f.firstElementChild)
    )
      f.firstElementChild.appendChild(g)
    else {
      var r = e.createElement('div')
      r.appendChild(g), e.write(r.innerHTML)
    }
  a.addEventListener(
    'resize',
    function () {
      clearTimeout(d), (d = setTimeout(c, 300))
    },
    !1
  ),
    a.addEventListener(
      'pageshow',
      function (a) {
        a.persisted && (clearTimeout(d), (d = setTimeout(c, 300)))
      },
      !1
    ),
    'complete' === e.readyState
      ? (e.body.style.fontSize = 12 * i + 'px')
      : e.addEventListener(
          'DOMContentLoaded',
          function () {
            e.body.style.fontSize = 12 * i + 'px'
          },
          !1
        ),
    c(),
    (k.dpr = a.dpr = i),
    (k.refreshRem = c),
    (k.rem2px = function (a) {
      var b = parseFloat(a) * this.rem
      return 'string' == typeof a && a.match(/rem$/) && (b += 'px'), b
    }),
    (k.px2rem = function (a) {
      var b = parseFloat(a) / this.rem
      return 'string' == typeof a && a.match(/px$/) && (b += 'rem'), b
    })
})(window, window.lib || (window.lib = {}))
```

- 使用 postcss-plugin-px2rem 插件，将 px 转为 rem

viewport + rem
flex

### 2，cookie、sessionStorage 和 localStorage 的异同。

![storage.png](../assets/storage.png)

- cookie,服务端、客户端都可以设置，有失效时间，最大 4kb，可以设置 httpOnly 阻止客户端 js 读取，同一域名
- localStorage,仅客户端设置,永久保存，最大 5mb，同协议、域名、端口
- sessionStorage，客户端设置，窗口关闭即消失，最大 5mb，同窗口、协议、域名、端口

### 3，清除浮动的方法?overflow：hidden 清除浮动的原理是什么。

- 设置为浮动的元素会脱离当前文档流，向左或向右移动直到遇到另一个浮动元素或者到达边界。
- clear 属性(left,right,both)，清除浮动
- 创建 bfc(块级格式化上下文)，创建一个独立的区域，内部的布局不会影响外面的元素

```txt
创建bfc
html根元素

float 除了none以外的值

position:absolute,fixed

display:flex,grid,inline-block,table-cell,flow-root
```

### 4，前端路由实现的原理是什么

- hash

```txt
hash 只作用在浏览器，不会在请求中发送给服务器。
hash 发生变化时，浏览器并不会重新给后端发送请求加载页面。
修改 hash 时会在浏览器留下历史记录，可以通过浏览器返回按钮回到上一个页面。
hash 发生变化时会触发 hashchange 事件，在该事件中可以通过 window.location.hash 获取到当前 hash值。
```

- history

```txt
pushState 和 repalceState 的标题（title）：一般浏览器会忽略，最好传入 null ；
我们可以使用 popstate  事件来监听 url 的变化；
history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面渲染；
```

hash 路径中带#不美观，history 简洁美观，hash 不需要对服务端做改动，history 需要服务端进行配置（如 nginx，将路径重定向到首页）

### 5，position 有哪几种属性，它们的区别是什么

- static 默认跟随文档流
- relative 不会脱离文档流，根据设置的 top，left 等属性相对其正常的位置进行偏移
- absolute 脱离文档流，其定位依赖于最近的非 static 定位的祖先元素，如果没有则以根元素 html 为基准
- fixed 脱离文档流，它的定位为相对于视口，根据 top、left、right、bottom 来设定
- sticky 根据正常的文档流进行定位，然后相对它的最近的滚动祖先，基于 top、left、right、bottom 进行偏移

### 6，说一下强制缓存和协商缓存

- 强制缓存 Expires（1.0） Cache-Control（1.1），只要未过期都不再请求服务器

- 协商缓存 Last-Modified/If-Modified-Since（1.0）、Etag/If-None-Match（1.0），先请求服务器，如果没有更新则使用缓存，每次都会更新标识
- 启发式缓存，如果响应头没有任何缓存标志，则用 date - last-modified/10

### 7，cookie 如何防止被恶意读取

- cookie 的同源策略仅包含域名/path，不包含协议与端口
- httpOnly 标识，防止客户端 js 读取
- secure 标识，仅 https 才会携带

### 8，什么是节流和防抖

- 场景：浏览器的 resize、scroll、keypress、mousemove 等事件在触发时，会不断地调用绑定在事件上的回调函数，极大地浪费资源，降低前端性能
- 节流：n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
- 防抖：n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时（查询接口）

```js
节流
function throttled1(fn, delay = 500) {
  let oldtime = Date.now()
  return function (...args) {
    let newtime = Date.now()
    if (newtime - oldtime >= delay) {
      fn.apply(null, args)
      oldtime = Date.now()
    }
  }
}

防抖
function debounce(func, wait) {
  let timeout

  return function () {
    let context = this // 保存this指向
    let args = arguments // 拿到event对象

    clearTimeout(timeout)
    timeout = setTimeout(function () {
      func.apply(context, args)
    }, wait)
  }
}
```

### 9，说几种 div 水平和垂直居中的方式

- Flex 方案

```css
justify-content: center;
align-items: center;
```

- Grid 方案

```css
justify-self: center; /* 水平居中 */
align-self: center; /* 垂直居中 */

margin: auto;
```

- absolute + transform

```css
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
```

- absolute + calc,需要定宽高

```css
position: absolute;
left: calc(50% - 50px);
top: calc(50% - 50px);
```

- absolute + 负 margin，定宽高

```css
position: absolute;
left: 50%;
top: 50%;
margin-left: -50px;
margin-top: -50px;
```

- absolute + margin: auto，如果

```css
position: absolute;
left: 0;
right: 0;
top: 0;
bottom: 0;
margin: auto;
```

### 10，如果浏览器禁用 cookie，怎么办?

- navigator.cookieEnabled 判断是否开启 cookie，弹窗提示用户开启
  [cookie 替代](https://zhuanlan.zhihu.com/p/131256002)

### 11,如果前端有一个请求需要非常短的时间请求后端的接口，怎么可以知道后端接口返回的数据的先后顺序。

### 12，如何预防 xss 和 csrf 攻击。

- xss 跨站脚本攻击 对用户输入的内容进行过滤
  - 反射型，非持久型由用户参数生成的url，
  - 存储型，永久保存，
  - 
- csrf 跨站请求伪造，利用浏览器保存的 cookie 伪造用户请求，加验证码，验证 referer、head 中添加 token、关键请求使用 post

### 13，polify 一个 map 函数使其可以以向下兼容

```js
function map() {
  this.store = { name: 'map' }
}

map.prototype.push = function (k, v) {
  console.log(this.store)
  this.store[k] = v
}

map.prototype.get = function (k) {
  if (Object.prototype.hasOwnProperty.call(this.store, k)) {
    return this.store[k]
  } else {
    return undefined
  }
}
```

### 14，说一下 es6 常用的方法。它们有什么新的特性。

- Promise
  主要解决回调地狱
- generator 函数
  是一个封装的异步任务容器，返回一个遍历器，内部可以使用 yield 语句表明异步任务，同时让出当前线程
- async/await
  是 带启动器的 generator 函数语法糖，await 后可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）
  async 表示当前函数内部存在异步操作，其返回值是一个 Promise 对象
  await 让出当前线程

- 函数/数组解构
- 箭头函数
- let/const
- set/map

### 15，一个字符串如何去掉字符串中的空格

b.replace(/ /g, '')

### 16，一个字符串如何去重

字符串去重

```js
b.split('')
  .filter((e, i) => b.indexOf(e) === i)
  .join('')
```

### 17，说一下二分法查找。它的时间度是多少

log2n

```js
function bs(arr, t) {
  let res = undefined
  let helper = function (start, end) {
    console.log(start, end)
    let mid = Math.floor((start + end) / 2)
    if (arr[mid] === t) {
      res = mid
      return
    }
    if (start >= end) return
    helper(0, mid)
    helper(mid + 1, end)
  }
  helper(0, arr.length - 1)
  return res
}
```

### 18，说一下 css3 中的 animation 和 transform 属性如何使用

transform:skew,translate,scale,rotate

transform-origin:50% 50% 0

animation:名称，动画执行时间，easing-function，delay，count，direction，fill-mode

### 19，标准盒子和怪异盒子

- content-box:不包含 padding 与 border
- border-box:包含 padding 与 border

### 20，说一下常用的 ajax 请求状态码

AJAX 状态码说明

- 1\*\*：请求收到，继续处理
- 2\*\*：操作成功收到，分析、接受
- 3\*\*：完成此请求必须进一步处理
- 4\*\*：请求包含一个错误语法或不能完成
- 5\*\*：服务器执行一个完全有效请求失败
- 100——客户必须继续发出请求
- 101——客户要求服务器根据请求转换 HTTP 协议版本
- 200——交易成功
- 201——提示知道新文件的 URL
- 202——接受和处理、但处理未完成
- 203——返回信息不确定或不完整
- 204——请求收到，但返回信息为空
- 205——服务器完成了请求，用户代理必须复位当前已经浏览过的文件
- 206——服务器已经完成了部分用户的 GET 请求
- 300——请求的资源可在多处得到
- 301——删除请求数据
- 302——在其他地址发现了请求数据
- 303——建议客户访问其他 URL 或访问方式
- 304——客户端已经执行了 GET，但文件未变化
- 305——请求的资源必须从服务器指定的地址得到
- 306——前一版本 HTTP 中使用的代码，现行版本中不再使用
- 307——申明请求的资源临时性删除
- 400——错误请求，如语法错误
- 401——请求授权失败
- 402——保留有效 ChargeTo 头响应
- 403——请求不允许
- 404——没有发现文件、查询或 URl
- 405——用户在 Request-Line 字段定义的方法不允许
- 406——根据用户发送的 Accept 拖，请求资源不可访问
- 407——类似 401，用户必须首先在代理服务器上得到授权
- 408——客户端没有在用户指定的饿时间内完成请求
- 409——对当前资源状态，请求不能完成
- 410——服务器上不再有此资源且无进一步的参考地址
- 411——服务器拒绝用户定义的 Content-Length 属性请求
- 412——一个或多个请求头字段在当前请求中错误
- 413——请求的资源大于服务器允许的大小
- 414——请求的资源 URL 长于服务器允许的长度
- 415——请求资源不支持请求项目格式
- 416——请求中包含 Range 请求头字段，在当前请求资源范围内没有 range 指示值，请求也不包含 If-Range 请求头字段
- 417——服务器不满足请求 Expect 头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求
- 500——服务器产生内部错误
- 501——服务器不支持请求的函数
- 502——服务器暂时不可用，有时是为了防止发生系统过载
- 503——服务器过载或暂停维修
- 504——关口过载，服务器使用另一个关口或服务来响应用户，等待时间设定值较长
- 505——服务器不支持或拒绝支请求头中指定的 HTTP 版本

### 21，说一下 vue 框架和 angular 框架之间的异同 (因为本人技术栈是 vue 和 angularJs)

### 22,vue 的 nextTick 这个方法有什么用

- 在下一次 DOM 更新之后执行的操作
- 将所有的回调函数压入 callbacks 数组
- Promise > MutationObserver > setImmediate > setTimeout

### 23，eventloop，微任务和宏任务

- js 是单线程的，所有的任务都在主线程执行
- 同步任务在执行栈中执行，异步任务由任务队列管理
- 异步任务分为宏任务、微任务
- 当前执行栈中为空的时候，去读取任务队列，被取到的任务会结束等待状态，进入执行栈
- microtask : Promise.then(),mutationObserver
- macotask : 同步代码，settimeout，setInterval，setimmediate

### 24，说一下什么是栈、什么是堆、什么是队列。

都是一种数据结构

- 栈：先进后出
- 堆：完全二叉树（堆中某个节点的值总是不大于或不小于其父节点的值）
- 队列：先进先出

### 25，vue 生命周期

### 26，简述一下 vue 的工作流程是什么样的（从 vue 初始化到页面渲染完成大致都经历了哪些过程）

初始化 vue 内部的变量与函数，这些用于接下来解析用户定义的数据、模板解析等。调用 beforecreate 钩子函数，初始化 props，data，methods 等用户自定义数据，调用 created 钩子函数此时可以访问 vue 实例。然后解析模板，将 template 文件解析为 render 函数，解析完成后调用 beforemount 钩子函数。然后执行 render 函数生成虚拟 dom，根据虚拟 dom 生成真实 dom 并将其挂载到页面中

### 27，从输入网址到页面展示都经历了些什么

css 加载不会阻塞 DOM 树解析，但是会阻塞 DOM 树渲染，并阻塞 js 执行
js 执行会阻塞 DOM 树的解析和渲染

[知乎](https://zhuanlan.zhihu.com/p/133906695)

- 解析域名，先查浏览器的中是否有缓存，再查 host 文件是否有映射，再查 dns 服务器
- tcp 三次握手建立 tcp 连接，发送 http 请求，服务端返回 http 响应
- 浏览器解析 html 以构建 dom 树 -> 构建 render 树 -> 布局 render 树 -> 绘制 render 树

### 28，说一下什么是重绘和重排

[重绘与重排](https://juejin.cn/post/6844904083212468238)

- 重排：当 DOM 的变化影响了元素的几何信息(元素的的位置和尺寸大小)，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排。
- 重绘：当一个元素的外观发生改变，但没有改变布局,重新把元素外观绘制出来的过程，叫做重绘。

### 29，vue 的 mixin 和 component 什么区别

- mixin 是可复用功能，如果与当前组件内的属性冲突，则当前组件的优先级更高，但是钩子函数会都执行，mixin 先执行
- component 是 vue 可复用的实例

### 30，vuex 为什么在 action 中可以异步提交数据再 mutation 中不可以异步提交数据

- action 操纵 mutation 来进行数据的更新

- 每个 mutation 执行完成后都会对应到一个新的状态变更，devtools 会记录这个快照，便于调试

### 31，说一下 slot### scope 和 scope 的区别

匿名插槽与具名插槽
作用域插槽，传值，已经被 v-slot:data 取代

### 32，vue 是如何实现双向数据绑定的

- 2.x Object.defineProperty 劫持数据，利用 getter 进行依赖收集，当 setter 触发的时候通知依赖进行更新，3.x 利用 es6 的 proxy 代理对象
- v-model，监听 change 事件

### 33，说一下 keep-alive 内置组件

- 被 keep-alive 包围的组件或路由会被缓存，切换的时候不会被销毁。通过 include、exclude 来判断是否缓存，或者通过 route.meta 信息通过 v-if
- 会有额外的生命周期，active、deactive

### 34，再 create 生命周期中可以拿到 data 中的数据吗

### 35，说一下路由守卫。再 beforeRouteEnter 阶段中可以拿到 vue 实例吗？如果不能怎么办

此钩子函数有三个参数，to、from、next，执行 next 的时候在其回调函数中会传入该路由组件的实例，可以通过该实例来访问

### 36，说一下 vue 组件间通讯的几种方式

- props / emit.
- parent/children
- provide/ inject
- refs
- eventBus
- Vuex
- localStorage / sessionStorage
- attrs 与 listeners.

### 38，说一下 webpack 打包的原理

- entry 入口文件，找出所有的依赖
- loader，将所有的依赖模块按照类型转换为浏览器可以识别的文件
- plugin，webpack 运行时会广播事件，插件可以监听这些事件，在它所关注的事件内进行文件处理
- output，文件输出位置

### 39，AMD、CMD、commonjs 和 es6 的 module 有什么异同

- AMD 异步加载，依赖前置，即执行前就加载依赖
- CMD 异步加载，就近依赖，执行时加载
- commonjs，同步加载，引入的是值的拷贝，运行时加载
- module，异步加载，是值的引用，编译时

### 40，说一下 loader 和 plugin 的区别

- loader 是文件编译器，将一种类型的文件转换为另一种文件
- plugin 是对 webpack 的拓展，基于 webpack 的事件机制，监听打包过程中的某些节点，然后执行广泛的任务

### 41，说一下你再项目中如何对 webpack 进行优化的

[webpack 优化](https://segmentfault.com/a/1190000022561279)

- webpack-bundle-analyzer 打包分析
- speed-measure-webpack-plugin 各 loader 与 plugin 的运行时间
- uglifyjs-webpack-plugin 压缩 js
- optimize-css-assets-webpack-plugin css 压缩
- image-webpack-loader 图片压缩
- splitChunksPlugin 代码分割

### 42，webpack 可以配置两个入口文件吗？怎么配置

可以，entry 传入入口文件对应的对象

### 43，说一下跨域的几种方式

[跨域](https://juejin.cn/post/6844903767226351623)
[cors-阮一峰](https://www.ruanyifeng.com/blog/2016/04/cors.html)

- cors：w3c 标准，目的时是解决跨域资源共享问题
  - 简单请求：可以直接发送跨域请求，get、head、post；头部信息只有 Accept、Accept-Language、Content-Language、Last-event-Id，content-Type 只有三个值
  - 预检请求：非简单请求的跨域，由浏览器发送一个 option 请求，根据服务器返回的响应报文判断是否支持该次请求
  - 非简单请求，如果预检请求通过，则发送
- jsonP
- nginx 反向代理
- 中间件

### 44，说一下 iframe 的优劣

可以原封不动的把网页嵌入进来，会产生很多页面，不好管理

### 45，手写一个冒泡排序

```js
function sort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) swap(arr, i, j)
    }
  }
}

function swap(arr, a, b) {
  let tmp = arr[a]
  arr[a] = arr[b]
  arr[b] = tmp
}
```

### 46，样式选择有哪些，他们的权重排序是什么样的

- id
- class
- 标签
- 属性
- 伪类
- 伪元素

### 47 对象深 copy

```js
let data = new WeakMap()

function deepClone(val) {
  if (data.has(val)) return data.get(val)

  if (Object.prototype.toString.call(val) === '[object Object]') {
    const res = {}
    for (const key in val) {
      res[key] = deepClone(val[key])
      data.set(val, res)
    }

    return res
  } else if (Array.isArray(val)) {
    let res = []
    for (let i = 0; i < val.length; i++) {
      res[i] = deepClone(val[i])
    }
    return res
  } else {
    return val
  }
}
```

### 47 垃圾回收机制

- 引用计数，记录每个对象被引用的次数，当 GC 发生时，计数为 0 的对象会被回收；缺点循环引用的无法被回收
- 标记清除，标记阶段，从根对象开始遍历，可以到达的对象被标记为可达对象；清除阶段，遍历堆内存，没有被标记的对象被清除
- v8 分代回收算法，新生代、老年代；新生代对象存活时间短，将内存一分为二，采用复制的方式将存活对象复制到另一块内存；如果复制过一次或 to 块使用超过 25%，会晋升到老年代；老年代对象采用标记清理与标记清除相结合的算法
- 三色标记，初始小黄太所有对象都是白色，初始标记 GCRoot 为黑色，然后遍历其子节点，将子节点标记为灰色，然后这些灰色节点会被推入一个 marking bitmap 的栈中，在栈中将所有节点标记为黑色并出栈，如果其有子节点则将其标记为黑色，并入栈。当所有对象都被标记完成后，只剩黑色和白色，此时清除白色

### 48 原型

- prototype：每个函数都有的属性，指向其原型对象
- _proto_:每个对象都有的属性，包括函数，对象的该属性指向其构造函数的原型对象，函数的该属性指向其构造函数的原型对象
- constructor：原型对象的一个属性，指向对象的构造函数

### 49 输入 url 后发生了啥

- 解析 url（防止 url 里面有特殊字符产生歧义），
- 根据域名查询 dns，hosts 文件=>dns 解析缓存=>dns 服务器
  1、递归查询：如果当前服务器没有数据，则向上级域名服务器发出查询请求，直到查到或者报错
  2、迭代模式：只告诉你可以查询的 dns 服务器地址
- 拿到域名对应的 ip 和端口，向服务器建立 tcp 连接
- 三次握手，客户端发送 syn（syn=j 同步序列号）包到 server，进入 syn_sent 状态，等待服务器确认；服务器收 syn 并确认 syn 包（ack=j+1),同时也发送一个自己的 ack 包（ack=1），进入 syn_recv 状态；客户端收到 syn+ack 包，向 server 发送 ack+1 的确认包并 1 建立连接
- https 连接，浏览器发送其支持的加密算法，如果 server 支持则发送证书，客户端验证证书的有效性。验证通过后生成随机数用公钥加密，生成握手信息的 hash 值，并用随机数加密，一并发送到服务端；server 收到后先解密随机数，再用随机数解密 hash 值，并与自己发送的握手信息比对，确保未被篡改；确认无误后同样用随机数加密握手信息和其 hash 值发回客户端，客户端收到后用随机数进行解密，验证信息，验证通过后完成握手。
- 然后请求 html 文件
- 解析
  1、构建 DOM 树
  2、构建 CSS 规则树
  3、DOM 树+CSS 树=render 树
  4、布局，计算节点在屏幕中的位置
  5、绘制，遍历 render 树绘制每个节点

### 50 首页加载优化

- HTML 文档结构层次尽量少，最好不深于六层；
- 脚本尽量后放，放在前即可；
- 少量首屏样式内联放在标签内；
- 样式结构层次尽量简单；
- 在脚本中尽量减少 DOM 操作，尽量缓存访问 DOM 的样式信息，避免过度触发回流；
- 减少通过 JavaScript 代码修改元素样式，尽量使用修改 class 名方式操作样式或动画；
- 动画尽量使用在绝对定位或固定定位的元素上；
- 隐藏在屏幕外，或在页面滚动时，尽量停止动画；
- 尽量缓存 DOM 查找，查找器尽量简洁；
- 涉及多域名的网站，可以开启域名预解析

### 51 回流重绘

- 回流，元素的几何信息发生变化，改变了页面布局如大小、位置
- 重绘，元素的外观发生改变，没有改变布局，如颜色、透明度、背景

### 52 css 加载与 js 加载

- js 加载会阻塞 dom 和解析与渲染，async，先解析，加载完成后立即执行；defer，先解析完成后再执行
- css 加载会阻塞 js 执行，阻塞 dom 渲染，不会阻塞 dom 解析

### 53 进程、线程、协程

- 进程：程序的一次执行过程，资源分配和调度的基本单位，就绪-执行-阻塞
- 线程：程序运行的最小单位，与其他线程共享资源
- 协程：轻量级线程，调度由用户自己控制，线程可以拥有多个协程

### seo 优化

- 前端语义化，header,main,aside,section,footer,nav
- tdk,title,description,keywords
- 微数据
- sitemap

### 首屏加载时间计算

- fcp 首次有渲染内容的时间
- lcp 页面加载到最大内容出现的时间
- chrome 可以使用 lighthouse 查看 meaningful content
- 或者使用 intersectionObserver+mutationObserver

### 前端工程化

- 前后端分离
- 使用 webpack 构建工程
- 使用 babel 转化 js 以增加兼容性
- css 预编译
- 模块化开发：避免命名冲突、便于依赖、提高代码复用
  - commonjs ：每个文件一个模块，只加载一次，以后加载只读缓存，引入的是模块的拷贝，运行时加载，输出值的拷贝
  - es6 module ：异步加载、编译时输出接口
  - AMD/CMD ：可以同步、异步加载，依赖前置
- 组件化开发
- mock 服务

### axios

- axios.get(url,[config]),axios.post(url.[config]),axios({url,method,data})
- 拦截器

  ```js
  axios.interceptors.request.use(
    (config) => {
      // before request
      return config
    },
    (error) => {
      //on error
      return error
    }
  )

  axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      //status code not 2xx
      return error
    }
  )
  ```

### get 与 post 区别

- get 只能使用 url 编码，post 可以支持多种编码的数据
  - encodeUrl：不会转义功能字符如/？&=
  - encodeUrlComponent：对整个 url 进行转义
- get 请求会被浏览器缓存，post 则不会
- get 请求长度最大 2kb，post 没有
- get 参数通过 url 传递，post 放在 requestBody

### this 指向问题

- 函数，谁调用的函数，this 就指向谁
- 构造函数，指向实例
- bind，apply，call 指向特定的对象

### http各版本区别
- 1.0 无法复用连接，缓存expires
- 1.1 
  - 长连接：connection设置kepp-alive，一个tcp可以传输多个http请求
  - 管道化，基于上述长连接，不等第一个请求响应，直接发送后续请求，顺序不变
  - 缓存：增加cache-control
  - 断点传输：range（request）/content-range（response）
- 2.0
  - 1.X解析是基于文本，2.0协议解析采用二进制
  - 多路复用，1.1必须等前一个请求关闭后才能发下一个；2.0可以并行
  - 服务端推送，主动发动可能用到的静态资源
  - 头部压缩，1.x是传输文本
