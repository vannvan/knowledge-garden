### 安装填坑

按照官网上手安装完umi后运行umi命令会报`文件名、目录名或卷标语法不正确。`,解决方法如下：

找到nodejs/bin/下的umi.cmd

> @"%~dp0\C:\Users\PC\AppData\Local\Yarn\Data\global\node_modules\.bin\create-umi.cmd"   %*
>
> 去掉盘符C前的字符



