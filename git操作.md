### 场景1

使用git进行合作时，有时会建立很多的分支，当分支两两合并完，想将代码移到主分支上时，如果采用merge的方式，往往会有很多冲突。

方法1

> git push origin test:master -f           *//将test分支强制（-f）推送到主分支master*

------

方法2（假设当前位于test分支）

> git checkout master                          *//将当前分支切换到主分支*
>
> git reset -hard test                            *//将主分支重置为test分支*
>
> git push origin master -force             *//将重置后的master分支强制推送到远程仓库*

方法3

>git checkout test1
>
>\#把test1重置为test2
>
>git reset --hard orgin/test2
>
>\#这一步不要git pull 直接强推
>
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
>
>git checkout .

或者

> git reset --hard

已提交，未推送

> git reset --hard master origin/master

##### 已推送

> git reset --hard HEAD^
>
> git push -f