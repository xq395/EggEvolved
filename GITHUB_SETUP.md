# GitHub 仓库设置指南

## 步骤 1：复制 SSH 公钥

你的 SSH 公钥已经生成，内容如下：

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKYaCmX8M2I31CnOZUkANxoAoFxhtuj/pIj1PmqT9wO2 3474193415@qq.com
```

## 步骤 2：在 GitHub 上添加 SSH 公钥

1. 登录 GitHub 账户
2. 点击右上角的头像 → Settings
3. 在左侧菜单中选择 SSH and GPG keys
4. 点击 New SSH key
5. Title 填写 "3474193415@qq.com"
6. Key 粘贴上面的公钥内容
7. 点击 Add SSH key

## 步骤 3：在 GitHub 上创建新仓库

1. 点击右上角的 + → New repository
2. Repository name 填写 "egg-evolution-game"
3. Description 填写 "蛋进化 - 一个基于HTML5 Canvas的策略棋盘游戏"
4. 选择 Public
5. 不要勾选 Initialize this repository with a README
6. 点击 Create repository

## 步骤 4：推送本地代码到 GitHub

创建仓库后，复制仓库的 SSH 地址（类似 `git@github.com:3474193415/egg-evolution-game.git`），然后在 PowerShell 中执行：

```powershell
# 在蛋进化目录中执行
git remote add origin git@github.com:3474193415/egg-evolution-game.git
git push -u origin master
```

## 完成

这样就完成了代码的 GitHub 上传。如果遇到任何问题，请检查 SSH 密钥是否正确添加到 GitHub 账户中。