---
title: "Day 3 - 自定义主题与样式"
date: 2024-01-03
draft: false
series: ["学习 Hugo"]
tags: ["Hugo", "教程", "主题", "样式"]
weight: 3
image: "image.svg"
---

## 自定义主题

本文介绍如何自定义 Hugo 主题的样式和布局。

![自定义示例](image.svg)

## 修改布局

在 `layouts` 目录下创建或修改模板文件：

```
layouts/
├── _default/
│   ├── single.html    # 单页模板
│   ├── list.html      # 列表页模板
│   └── baseof.html    # 基础模板
└── partials/
    ├── header.html    # 页眉
    └── footer.html    # 页脚
```

## 添加自定义 CSS

在 `static/css/` 目录下创建 CSS 文件：

```css
/* static/css/custom.css */
body {
  font-family: "Noto Sans SC", sans-serif;
}

.post-title {
  color: #333;
  font-size: 2rem;
}
```

在模板中引用：

```html
<link rel="stylesheet" href="{{ "css/custom.css" | relURL }}">
```

## 使用 Page Bundle

像本文一样，可以将图片和文章放在同一个文件夹中：

```
day3-custom/
├── index.md       # 文章内容
└── image.svg      # 图片资源
```

在文章中引用：

```markdown
![图片描述](image.svg)
```

## 总结

通过本系列教程，你已经掌握了：

1. ✅ Hugo 的安装
2. ✅ 网站的创建和配置
3. ✅ 主题的自定义

继续探索 Hugo 的更多功能吧！
