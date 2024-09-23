import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  base: "/",
  // 请不要忘记设置默认语言
  lang: 'zh-CN',
  title: '云笔记',
  head: [
    ['link', { rel: 'icon', href: 'https://y.creammint.cn/basis/build-img/note.png' }],
    // 添加其他head内容，比如添加样式等
  ],
  theme: plumeTheme({
      logo: "https://y.creammint.cn/basis/build-img/note.png",   
      footer: {
        // 自定义 footer，留空字符串可以隐藏
        copyright: '©2024 Cream薄荷糖',
        poweredBy: false, 
      },
      profile: {
        name: 'Cream薄荷糖',
        description: 'Cream薄荷糖的云笔记',
        avatar: 'https://y.creammint.cn/basis/build-img/avatar_2.webp',
        circle: true, // 是否为圆形头像
        footer: '©2024 Cream薄荷糖',
      },
      navbar: [
        { text: '首页', link: '/', icon: 'material-symbols:home-outline' },
        {
          text: '数据库',
          icon: 'bxs:data',
          items: [
            {
              items: [
                {
                  text: 'Oracle',
                  link: '/database/gveb0901/',
                }
              ],
            },
          ],
        },
        {
          text: 'Java',
          icon: 'solar:tea-cup-outline',
          items: [
            {
              items: [
                {
                  text: '业务实现',
                  link: '/java/skg8dhyj/',
                },
                {
                  text: 'Java面试',
                  link: '/java/skg8dhyj/',
                }
              ],
            },
          ],
        },
        {
            text: 'VuePress2',
            icon: 'material-symbols:article-outline',
            items: [
                {
                items: [
                    {
                        text: 'Plume主题',
                        link: 'https://plume.pengzhanbo.cn/guide/intro/',
                        icon: 'https://plume.pengzhanbo.cn/plume.png' 
                    },
                    {
                        text: 'iconify',
                        link: 'https://icon-sets.iconify.design/',
                        icon: 'line-md:iconify1'
                    }
                ],
                },
          
            ],
        },
      ],
      notes: {
        dir: '/notes/', // 声明所有笔记的目录
        link: '/', // 声明所有笔记默认的链接前缀， 默认为 '/'
        notes: [
          {
            dir: 'database', // 声明笔记的目录，相对于 `notes.dir`
            link: '/database/', // 声明笔记的链接前缀
            sidebar: [ // 配置侧边栏
              {
                text: '基础语法',
                //icon: 'mdi:language-typescript', // 侧边栏图标
                items: ['Oracle简介','Oracle 数据库连接','Oracle 数据库创建导入'] // 简化写法，主题会自动补全为 `foo.md`
              },
              {
                text: '函数',
                //icon: 'mdi:language-typescript', // 侧边栏图标
                items: ['Oracle简介','Oracle 数据库连接','Oracle 数据库创建导入'] // 简化写法，主题会自动补全为 `foo.md`
              },
            ]
          },
          {
            dir: 'java',
            link: '/java/',
            sidebar: [
              { text: 'Java', items: ['Excel文件上传'] }
            ]
          }
        ]
      }
  }),
  bundler: viteBundler(),
})