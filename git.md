### 场景1

使用git进行合作时，有时会建立很多的分支，当分支两两合并完，想将代码移到主分支上时，如果采用merge的方式，往往会有很多冲突。

方法1

> git push origin test:master -f           *//将test分支强制（-f）推送到主分支master*

------

方法2（假设当前位于test分支）

> git checkout master                          *//将当前分支切换到主分支*
> git reset -hard test                            *//将主分支重置为test分支*
> git push origin master -force             *//将重置后的master分支强制推送到远程仓库*

方法3

>git checkout test1     //把test1重置为test2
>git reset --hard orgin/test2  //这一步不要git pull 直接强推
>git push --force

### 场景2

不想提交进行了一半的工作

> git stash    储藏
> git  stash list   查看储藏
> git stash apply  使用最近的储藏
> git stash apply stash@{2}    指定储藏

### 场景3

有时候我们提交完了才发现漏掉了几个文件没有加，或者提交信息写错了。想要撤消刚才的提交操作，可以使用 `--amend` 选项重新提交：

> git commit --amend

### 场景三

由于失误给远程仓库提交了很多不必要的文件，可以先整理好本地仓库文件确认无误后，覆盖远程仓库。

> git push origin 分支名 --force

### 撤销操作

##### 已修改，未暂存

> git reset --hard

##### 已暂存，未提交

>git reset 
>git checkout .

或者

> git reset --hard

已提交，未推送

> git reset --hard master origin/master

##### 已推送

> git reset --hard HEAD^
> git push -f

### git基本命令合集

git常用命令：

git init //初始化本地git环境
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

克隆一个全新的项目，完成新功能并且提交：
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