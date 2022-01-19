module.exports = {
  title: 'pandafeeder',
  description: 'note',
  theme: '@vuepress/blog',
  themeConfig: {
    sidebar: [
      '/',
      {
        title: '前端',
        collapsable: false,
        children: [['vue/vue', 'vue的一些知识']],
      },
    ],
  },
}
