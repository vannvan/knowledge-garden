### 场景1

使用git进行合作时，有时会建立很多的分支，当分支两两合并完，想将代码移到主分支上时，如果采用merge的方式，往往会有很多冲突。

方法1

> git push origin test:master -f           //将test分支强制（-f）推送到主分支master


方法2（假设当前位于test分支）

> git checkout master                          //将当前分支切换到主分支
git reset --hard test                            //将主分支重置为test分支
git push origin master --force             //将重置后的master分支强制推送到远程仓库


方法3

> git checkout test1     //把test1重置为test2
git reset --hard origin/test2  //这一步不要git pull 直接强推
git push --force


### 场景2

不想提交进行了一半的工作

> git stash    储藏
git stash list   查看储藏
git stash apply  使用最近的储藏
git stash apply stash@{2}    指定储藏


### 场景3

有时候我们提交完了才发现漏掉了几个文件没有加，或者提交信息写错了。想要撤消刚才的提交操作，可以使用 `--amend` 选项重新提交：

> git commit --amend


### 场景4

由于失误给远程仓库提交了很多不必要的文件，可以先整理好本地仓库文件确认无误后，覆盖远程仓库。

> git push origin 分支名 --force


### 撤销操作

##### 已修改，未暂存

> git reset --hard


##### 已暂存，未提交

> git reset
git checkout .
> git reset HEAD .   //已经修改的仍能保留


或者
> git reset --hard

##### 已提交，未推送
> git reset --hard master origin/master

```bash
> git reset --soft HEAD^      //撤销commit，不撤销git add . 仅仅是撤回commit操作，您写的代码仍然保留。
>
> git reset --mixed HEAD^  //不删除工作空间改动代码，撤销commit，并且撤销git add . 操作
>
> git reset --hard HEAD^   //删除工作空间改动代码，撤销commit，撤销git add . 
>
> 注意完成这个操作后，就恢复到了上一次的commit状态。
>
> git commit --amend     //如果commit注释写错了，只是想改一下注释
```

##### 已推送

> git reset --hard HEAD^
git push -f


### 强行拉取远程覆盖本地

```bash
git fetch --all && git reset --hard origin/master && git pull
```

### git基本命令合集

git常用命令：

> git init //初始化本地git环境
git clone XXX//克隆一份代码到本地仓库
git pull //把远程库的代码更新到工作台
git pull --rebase origin master //强制把远程库的代码跟新到当前分支上面
git fetch //把远程库的代码更新到本地库
git add . //把本地的修改加到stage中
git commit -m 'comments here' //把stage中的修改提交到本地库
git push //把本地库的修改提交到远程库中
git branch -r/-a //查看远程分支/全部分支
git checkout master/branch //切换到某个分支
git checkout -b test //新建test分支
git checkout -d test //删除test分支
git merge master //假设当前在test分支上面，把master分支上的修改同步到test分支上
git merge tool //调用merge工具
git stash //把未完成的修改缓存到栈容器中
git stash list //查看所有的缓存
git stash pop //恢复本地分支到缓存状态
git blame someFile //查看某个文件的每一行的修改记录（）谁在什么时候修改的）
git status //查看当前分支有哪些修改
git log //查看当前分支上面的日志信息
git diff //查看当前没有add的内容
git diff --cache //查看已经add但是没有commit的内容
git diff HEAD //上面两个内容的合并
git reset --hard HEAD //撤销本地修改
echo $HOME //查看git config的HOME路径
export $HOME=/c/gitconfig //配置git config的HOME路径

### 团队协作git操作流程：

> 克隆一个全新的项目，完成新功能并且提交：
git clone XXX //克隆代码库
git checkout -b test //新建分支
modify some files //完成修改
git add . //把修改加入stage中
git commit -m '' //提交修改到test分支
review代码
git checkout master //切换到master分支
git pull //更新代码
git checkout test //切换到test分支
git meger master //把master分支的代码merge到test分支
git push origin 分支名//把test分支的代码push到远程库
目前正在test分支上面开发某个功能，但是没有完成。突然一个紧急的bug需要处理
git add .
git stash
git checkout bugFixBranch
git pull --rebase origin master
fix the bug
git add .
git commit -m ''
git push
git checkout test
git stash pop
continue new feature's development

一篇文章 ->深入理解学习Git工作流
[https://www.cnblogs.com/xirongliu/p/4584653.html](https://www.cnblogs.com/xirongliu/p/4584653.html)

### git配置项目用户作者信息⭐️

```bash
git config user.name “gitlab’s Name”
git config user.email "gitlab@xx.com"
git config --list
//全局
git config --global user.name “gitlab’s Name”
```

### git修改分支名称

```bash
git branch -m old_branch new_branch # Rename branch locally 
git push origin :old_branch # Delete the old branch 
git push --set-upstream origin new_branch # Push the new branch, set local branch to track the new remote
```

### 删除分支

```bash
git push origin --delete dev   # 删除远程分支
git branch -D dev  # 删除本地分支
```

### git 区分文件大小写

```bash
git config core.ignorecase false
```

### git 查看某个文件的修改历史

先切换到该文件目录下

```bash
git log --pretty=oneline 文件名
```

会有如下信息

> bf0e7ceb5fadbdaa7b69c9a1b10861b32d347ef4 修改设备场景参数名称
65a2f774cd04fa9208636d2d55b55989fc6739ac 功能迁移完毕
1ebc1ac6d71e0c3f1b619311634abe78251160f4 新增场景的分省判断
e92e48581a01ed3e8a617329bae1081a328d4417 根据地区区分部分操作上的不同
30027e6d15d0f5bba36747dbd53f5ef0cf206196 设备更新参数修改，开启gzip
f5fca91cb4e62a1058d2e1f970852c4e127076de 同步历史记录时间转换iebug
a5b37b5c13ff6c66396505ecd9c7b4f19754547f 修改设备场景显示及操作规则
89241fa600824c4d164d3401162e1dce4d378552 修改设备管理


```javascript
git show 1ebc1ac6d71e0c3f1b619311634abe78251160f4
```

### 分支

```bash
# 查看本地分支
$ git branch | git branch -l 
# 查看远程分支
$ git branch -r 
# 查看所有分支（本地分支+远程分支）
$ git branch -a 
# 查看所有分支并带上最新的提交信息
$ git branch -av 
# 查看本地分支对应的远程分支
$ git branch -vv
```

### git commit规范   
来源[手把手带你入门前端工程化——超详细教程 - 掘金](https://juejin.im/post/6892003555818143752#heading-2)
```git
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

大致分为三个部分(使用空行分割):

1. 标题行: 必填, 描述主要修改类型和内容
2. 主题内容: 描述为什么修改, 做了什么样的修改, 以及开发的思路等等
3. 页脚注释: 可以写注释，BUG 号链接

> - feat: 新功能、新特性
> - fix: 修改 bug
> - perf: 更改代码，以提高性能
> - refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
> - docs: 文档修改
> - style: 代码格式修改, 注意不是 css 修改（例如分号修改）
> - test: 测试用例新增、修改
> - build: 影响项目构建或依赖项修改
> - revert: 恢复上一次提交
> - ci: 持续集成相关文件修改
> - chore: 其他修改（不在上述类型中的修改）
> - release: 发布新版本
> - workflow: 工作流相关文件修改
> 
 
> 1. scope: commit 影响的范围, 比如: route, component, utils, build...
> 2. subject: commit 的概述
> 3. body: commit 具体修改内容, 可以分为多行.
> 4. footer: 一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接.


### 辅助工具

> husky


```json
"husky": {
  "hooks": {
    "pre-commit": "npm run lint",
    "commit-msg": "node script/verify-commit.js",
    "pre-push": "npm test"
  }
}
```

```javascript
const msgPath = process.env.HUSKY_GIT_PARAMS
const msg = require('fs')
.readFileSync(msgPath, 'utf-8')
.trim()

const commitRE = /^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?: .{1,50}/
// 这条正则表达式要求符合示例：
// fix(common): 修复字体过小的BUG，将通用管理下所有页面的默认字体大小修改为 14px    //半角冒号后面有空格
if (!commitRE.test(msg)) {
    console.log()
    console.error(`
        不合法的 commit 消息格式。
        请查看 git commit 提交规范：https://github.com/woai3c/Front-end-articles/blob/master/git%20commit%20style.md
    `)

    process.exit(1)
}
```

- `"pre-commit": "npm run lint"`，在 `git commit` 前执行 `npm run lint` 检查代码格式。
- `"commit-msg": "node script/verify-commit.js"`，在 `git commit` 时执行脚本 `verify-commit.js` 验证 commit 消息。如果不符合脚本中定义的格式，将会报错。
- `"pre-push": "npm test"`，在你执行 `git push` 将代码推送到远程仓库前，执行 `npm test` 进行测试。如果测试失败，将不会执行这次推送.

### .gitignore

```javascript
.DS_Store
node_modules/
npm-debug.log*
yarn-debug.log*
yarn.lock
yarn-error.log*
/test/unit/coverage/
/test/e2e/reports/
selenium-debug.log
node_modules
release


# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.env
*.env.development


dist/

.aliossrc
```

### rebase

[rebase使用的四个场景](https://blog.csdn.net/mulinsen77/article/details/106221457)

[git合并提交记录](https://www.jianshu.com/p/922b161591a0)

pick是rebase时的指令，具体我们还可以使用如下指令：

```bash

选择pick指令，git会应用这个提交，以同样的提交信息（commit message）保存提交
选择reword指令，git会应用这个提交，但需要重新编辑提交信息
选择edit指令，git会应用这个提交，但会因为amending而终止
选择squash指令，git会应用这个提交，但会与之前的提交合并
选择fixup指令，git会应用这个提交，但会丢掉提交日志
选择exec指令，git会在shell中运行这个命令
```

### 命令行提交记录图

> git log --graph --pretty=oneline --abbrev-commit


### git修改为之前的日期
> git commit --date="May 7 9:05:20 2016 +0800" -am "提交"

