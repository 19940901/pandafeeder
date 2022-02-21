# Vue 的总结

### v-for 比 v-if 优先级高

每次循环的时候都会进行 if 计算，对性能有影响，可以使用 computed 属性，将 arr 过滤后再传给 v-for

### key 的作用

key 是 vnode 的唯一标识，列表渲染时快速定位 vnode，以决定是否可以复用（根据 key 来查找当前 node 是否在旧的 vnode 列表中存在）；在 transition 中使用 key 避免同名标签元素不触发过渡效果。

### 虚拟 dom

是对真实 dom 的一个抽象，它是由 js 对象（vnnode）组成的一棵树，每个对象与真实 dom 节点一一对应，它里面包含节点的标签名、属性、子节点信息等。vue 可以根据虚拟 dom 创建、更新真实 dom

### Vue 初始化过程

初始化 vue 内部的变量与函数，这些用于接下来解析用户定义的数据、模板解析等。调用 beforecreate 钩子函数，初始化 props，data，methods 等用户自定义数据，调用 created 钩子函数此时可以访问 vue 实例。然后解析模板，将 template 文件解析为 render 函数，解析完成后调用 beforemount 钩子函数。然后执行 render 函数生成虚拟 dom，根据虚拟 dom 生成真实 dom 并将其挂载到页面中

### vue 懒加载

路由懒加载，组件懒加载，其实就是异步加载，webpack 将异步加载转换为 requireEnsure，根据打包时候生成的 chunkid 去加载对应的模块，入口模块内部有一个 map 对象来标记 chunk 是否加载，0 表示已经加载、promise 对象表示正在加载中（120s 的超时时间），加载成功后会调用回调函数将该 chunk 的标志改为 0，其他的表示加载失败。requireEnsure 返回的是一个 promiseAll 对象，执行完成后利用 webpackrequire 去加载该模块中的 vue 实例

### vue3.0

- proxy api 替换 defineProperty api，2.0 中只能监听 data 中预设的属性，对每个对象的属性做遍历+递归，如果要新增属性则需要调用专门的 api。3.0 中的 proxy，是对对象层面的代理，对象的所有操作都会被监听
- diff 算法优化
- 自定义钩子函数

### vue3 是如何代理多层对象的

当触发 proxy 的 get 方法时，对 Reflect.get 返回的值进行判断，如果是对象，则用 reactive 再进行一次代理

### vue3 的数组如何避免多次 get/set

利用 object.hasOwnProperty 判断当前的 key 是不是数组本身的属性，如果是则不进行 trigger 操作

### vue2 如何监听数组

使用函数劫持，重写 7 个方法，push、pop、shif、unshift、sort、reverse、splice。对于数组中存在的数据或者通过 push、unshift、splice 等添加的，如果是引用类型，再进行数据劫持

### vue 虚拟列表

当页面列表存在大量数据的时候，只渲染当前视口的数据，减少 dom 中节点的数量
原理，列表相对于父容器绝对定位，父容器滚动时会跟随滚动即会出现滚动效果，当列表第一个元素离开视野利用translate3d将列表偏移

```vue
<template>
  <div class="list" ref="list" @scroll="handleScroll">
    <!-- 撑起滚动条 -->
    <div :style="{ height: item.length * itemHeight + 'px' }"></div>
    <!-- 滚动列表 -->
    <div class="wrapper" ref="wrapper">
      <div class="list-item" v-for="item in visibleData" :key="item">
        {{ item }}
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from '@vue/reactivity'
let visibleCount = null
export default {
  setup() {
    let list = reactive([])
    for (let i = 0; i < 1000; i++) list.push(i)
    return {
      item: list,
    }
  },
  data() {
    return {
      start: 0,
      end: 10,
      itemHeight: 80,
      visibleData: [],
    }
  },
  mounted() {
    visibleCount = Math.ceil(this.$refs.list.clientHeight / this.itemHeight)
    this.updateVisibleData()
  },
  computed: {
    scrollList() {
      return this.item.slice(this.start, this.end)
    },
  },
  methods: {
    updateVisibleData(scrollTop) {
      scrollTop = scrollTop || 0 //滚动高度
      const start = Math.floor(scrollTop / this.itemHeight) //首条数据位置
      const end = start + visibleCount //结束数据位置
      this.visibleData = this.item.slice(start, end) //更新可见数据
      this.$refs.wrapper.style.webkitTransform = `translate3d(0, ${
        start * this.itemHeight
      }px, 0)` //可视数据相对list container的偏移
    },

    handleScroll() {
      const scrollTop = this.$refs.list.scrollTop
      this.updateVisibleData(scrollTop)
    },
  },
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
.list {
  max-height: 100vh;
  overflow: auto;
  position: relative;
}
.wrapper {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.list-item {
  height: 80px;
  line-height: 80px;
  text-align: center;
  border-bottom: 1px solid grey;
}
</style>
```
