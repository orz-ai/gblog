# 照片墙功能使用说明

本博客集成了照片墙功能，用于展示和分享照片。

## 使用方法

### 1. 添加照片内容

使用以下命令创建新的照片内容：

```bash
hugo new photos/my-photo-name.md
```

这将创建一个新的Markdown文件，包含以下前置元数据：

```yaml
---
title: "My Photo Name"
date: [当前日期时间]
draft: false
image: "/images/photos/my-photo-name.jpg"
location: ""
camera: ""
tags: []
---

在此处添加照片描述...
```

### 2. 编辑照片内容

修改生成的Markdown文件，填写以下信息：

- `title`: 照片标题
- `date`: 拍摄日期或发布日期
- `image`: 照片文件路径（默认为`/images/photos/[文件名].jpg`）
- `location`: 拍摄地点（可选）
- `camera`: 相机型号（可选）
- `tags`: 标签列表，用于照片分类

在正文部分添加照片的详细描述。

### 3. 添加照片文件

将实际照片文件放在 `static/images/photos/` 目录下，确保文件名与内容文件中指定的一致。

例如，如果你创建了 `content/photos/my-photo-name.md`，则应该将对应的照片文件保存为 `static/images/photos/my-photo-name.jpg`。

### 4. 预览和发布

使用以下命令预览博客：

```bash
hugo server -D
```

然后访问 http://localhost:1313/photos/ 查看照片墙。

## 照片墙功能

照片墙包含以下特性：

1. 网格式照片展示
2. 点击照片查看大图和详情
3. 支持键盘导航浏览照片（左右箭头）
4. 照片详情页面展示拍摄地点、相机等信息
5. 支持按标签分类照片

## 自定义

如需自定义照片墙的样式和布局，可以修改以下文件：

- `themes/gblog/layouts/photos/list.html`: 照片墙列表页面模板
- `themes/gblog/layouts/photos/single.html`: 照片详情页面模板 