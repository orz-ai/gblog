---
title: "Day 1 - Hugo 安装与环境配置"
date: 2024-01-01
draft: false
series: ["学习 Hugo"]
tags: ["Hugo", "教程", "安装"]
weight: 1
---

## 安装 Hugo

本文介绍如何在不同操作系统上安装 Hugo。

### Windows 安装

使用 Chocolatey 安装：

```bash
choco install hugo-extended
```

或使用 Scoop：

```bash
scoop install hugo-extended
```

### macOS 安装

使用 Homebrew 安装：

```bash
brew install hugo
```

### Linux 安装

```bash
sudo apt-get install hugo
```

### 验证安装

安装完成后，运行以下命令验证：

```bash
hugo version
```

如果看到版本号，说明安装成功！

## 下一步

下一篇我们将学习如何构建第一个 Hugo 网站。
