## mac zsh修改终端前缀 

转义描述

转义变量 描述

%T 系统时间（时：分）

%* 系统时间（时：分：秒）

%D 系统日期（年-月-日）

%n 你的用户名

%B - %b 开始到结束使用粗体打印

%U - %u 开始到结束使用下划线打印

%d 你目前的工作目录

%~ 你目前的工作目录相对于～的相对路径（可能在某些zsh版本可能造成乱码）

%M 计算机的主机名

%m 计算机的主机名（在第一个句号之前截断）

%l 你当前的tty

https://zhuanlan.zhihu.com/p/149763958

```bash
sudo vim /etc/zshrc
```

定位到70行

原始内容为

> PS1="%n@%m %1~ %# "

去掉%n

> PS1="@%m %1~ %# "  //样式1
>
> PS1="~ %m %1~ %# "  /样式2

**<u>改完wq!强制保存</u>**

修改主机名

```bash
sudo scutil --set HostName 自定义主机名
```





### mac 自动定时执行任务

https://www.jianshu.com/p/4fbad2909a21

### nginx 安装使用

https://www.cnblogs.com/tandaxia/p/8810648.html

### mac定时任务

https://www.jianshu.com/p/d8f9804f4222