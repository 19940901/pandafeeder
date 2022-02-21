### 背景

前几天用 canvas 做了一个折线图 line chart，在电脑端还好，但是在移动端会变得模糊。原因是屏幕分辨率变高，物理像素密度变大，相应的 dpr 也变大，而 canvas 绘制的时候还是用原来的 dpr 去渲染，`相当于用 4k 的播放器去播放 720p 的图片，自然是模糊`
_devicePixelRatio：DPR = 设备像素/CSS 像素_

### 方法一

```js
let ratio = window.devicePixelRatio
const e = document.getElementById('canvas')
const context = e.getContext('2d')

width = e.style.width //根据实际情况获取元素的宽度与高度
height = e.style.height

e.setAttribute('width', width * ratio)
e.setAttribute('height', height * ration)
```

### 方法二

```js
let ratio = window.devicePixelRatio
const e = document.getElementById('canvas')
const context = e.getContext('2d')

let width = 250
let height = 250
//视口大小
e.style.width = width + 'px'
e.style.height = height + 'px'
if (ratio > 1) {
  //画布缩放
  e.width = width * ratio
  e.height = height * ratio
  context.scale(ratio, ratio)
} else {
  e.width = width
  e.height = height
}
```

### 原理

我们把页面中的`<canvas>`元素当作一个播放器，而 canvas 画布上的东西就相当于源文件。当播放器的分辨率很低的时候，我们对画布上源文件不需要很高的分辨率。但是当播放器的分辨率变高，便能看到更多的`"细节"`,所以需要用更多的`'料"`来补充细节

- 固定视口大小
  `e.style.width = width + 'px'`
  ` e.style.height = height + 'px'`
- 这一步是把画布拉伸，便于`"填料"`(画布默认大小为 300x150)
  `e.width = width * ratio`
  ` e.height = height * ratio`
- 这一步是告诉画笔接下来的工作多填料
  `context.scale(ratio, ratio)`

`dpr=1`的时候，1css 像素可以用 1 物理像素渲染

`dpr=2`的时候，1css 像素就需要 2x2 个物理像素来渲染，不能一个干活其余围观
