module.exports = {
  title: 'pandafeeder',
  description: 'note',
  docsDir: 'docs',
  theme: '@vuepress/blog',
  themeConfig: {
    sidebar: [
      '/',
      {
        title: '前端',
        collapsable: false,
        children: [
          ['frontend/vue', 'Vue的一些知识'],
          ['frontend/canvasBlurIssue', '解决canvas模糊问题'],
          ['frontend/jwt', 'jwt单点登录'],
          ['frontend/imageLazyLoad', '图片懒加载之高斯模糊'],
          ['frontend/cssCircle', 'HTML环形加载'],
          ['frontend/interview', '常用知识点'],
        ],
      },
    ],
  },
}
