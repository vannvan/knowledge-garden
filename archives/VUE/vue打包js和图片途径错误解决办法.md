# vue打包静态资源路径不正确的解决办法

vue项目完成打包上线的时候很多人都会碰到静态资源找不到的问题，常见的有两个

1、js，css路径不对

解决办法：打开config/index.js，将build下的其中的assetsPublicPath值改为’./’

![](https://img-blog.csdn.net/20180321150503347?watermark/2/text/Ly9ibG9nLmNzZG4ubmV0L3hpZWNoZW5namlhbg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

2、css中引用的图片资源找不到 

打开“build/utils.js”，增加一行代码即可 

![](https://img-blog.csdn.net/20180321150552569?watermark/2/text/Ly9ibG9nLmNzZG4ubmV0L3hpZWNoZW5namlhbg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

