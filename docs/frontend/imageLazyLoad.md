# 图片懒加载之高斯模糊

- html

```html
<div>
  <!-- 图片未加载完成时可以通过a标签浏览-->
  <a href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/nature5.jpg">
    <img
      style="width:800px;height:200px"
      class="lazy-img"
      src="../assets/nature.jpg"
      data-original="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/nature5.jpg"
      alt=""
    />
  </a>
</div>
```

- js

```js
function lazyLoad () {
      const imgs = document.getElementsByClassName('lazy-img')

      let img = new Image()
      const oldImg = imgs[0]
      img.src = oldImg.getAttribute('data-original')
      img.classList.add('real-img')
      let replaceImg = function () {
        const c = oldImg.parentElement
        c.removeAttribute('href')
        c.appendChild(img)
        c.removeChild(oldImg)

      }
      const replace = function () {
        requestAnimationFrame(replaceImg)
      }
      if (img.complete)
        replace()
      else
        img.onload = replace
    },

window.addEventListener('load', () => {
      lazyLoad()
})
```

- css

```css
img:not(.lazy-img) {
  will-change: transform opacity;
  width: 800px;
  height: 200px;
  animation: realImg 0.5s linear;
}

@keyframes realImg {
  0% {
    filter: blur(15px);
  }
  100% {
    filter: blur(0);
  }
}

.lazy-img {
  filter: blur(15px);
}
```
