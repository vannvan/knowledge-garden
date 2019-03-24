# vue打包静态资源路径不正确的解决办法

vue项目完成打包上线的时候很多人都会碰到静态资源找不到的问题，常见的有两个

1、js，css路径不对

解决办法：打开config/index.js，将build下的其中的assetsPublicPath值改为’./’

![](http://www.ftc20.com/wordpress/wp-content/uploads/2017/11/20171102171215.png)

2、css中引用的图片资源找不到 

打开“build/utils.js”，增加一行代码即可 

![](http://www.ftc20.com/wordpress/wp-content/uploads/2017/11/20171102171215-1.png)

原文：http://www.ftc20.com/wordpress/2017/11/vue-static-resource-route-question/d