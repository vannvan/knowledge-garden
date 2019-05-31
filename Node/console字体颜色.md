## 示例

> ```console.log(&#39;\033[42;30m DONE \033[40;32m Compiled successfully in 19987ms\033[0m&#39;)
> console.log('\033[42;30m DONE \033[40;32m Compiled successfully in 19987ms\033[0m')
> ```

## 效果

![](https://upload-images.jianshu.io/upload_images/3602599-479eabac698d08cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/321/format/webp)



## 解释

> `\033[背景色编号;字色编号m` 。
>
> 字色编号：30黑，31红，32绿，33黄，34蓝，35紫，36深绿，37白色
> 背景编号：40黑，41红，42绿，43黄，44蓝，45紫，46深绿，47白色

上面那段代码的解释：用绿底（42）黑字（30）显示“DONE”，然后使用黑底（40）绿字（32）显示余下的信息，最后还原属性`\033[0m`

