---
title: "Day 2 - 构建第一个 Hugo 网站"
date: 2024-01-02
draft: false
series: ["学习 Hugo"]
tags: ["Hugo", "教程", "网站建设"]
weight: 2
---

## 创建新站点

使用以下命令创建一个新的 Hugo 站点：

```bash
hugo new site my-blog
cd my-blog
```

## 目录结构

Hugo 会自动创建以下目录结构：

```
my-blog/
├── archetypes/     # 内容模板
├── content/        # 网站内容
├── data/          # 数据文件
├── layouts/       # 布局模板
├── static/        # 静态资源
├── themes/        # 主题
└── hugo.toml      # 配置文件
```

## 添加主题

下载并安装一个主题：

```bash
git init
git submodule add https://github.com/xxx/theme.git themes/theme-name
```

在 `hugo.toml` 中配置主题：

```toml
theme = "theme-name"
```

## 创建第一篇文章

```bash
hugo new posts/my-first-post.md
```

## 启动开发服务器

```bash
hugo server -D
```

访问 `http://localhost:1313` 查看你的网站！

## 下一步

下一篇我们将学习如何自定义主题样式。
