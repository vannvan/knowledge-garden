### 场景

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

