### 安装填坑

按照官网上手安装完umi后运行umi命令会报`文件名、目录名或卷标语法不正确。`,解决方法如下：

找到nodejs/bin/下的umi.cmd

> @"%~dp0\C:\Users\PC\AppData\Local\Yarn\Data\global\node_modules\.bin\create-umi.cmd"   %*
>
> 去掉盘符C前的字符



 安装umi时报错 `'E:\Program' 不是内部或外部命令，也不是可运行的程序` 

> yarn global bin  //查看yarn安装插件的路径
>
> 假设路径是C:\Program Files (x86)\Yarn\bin
>
> yarn global add create-umi --prefix "C:\Program Files (x86)\Yarn\bin"

## 文章

- [umi3.0基础配置文件（.umirc.ts配置文件试玩](https://www.cnblogs.com/lhl66/p/12972445.html)

- [tsconfig.json配置详解](https://segmentfault.com/a/1190000021749847)



