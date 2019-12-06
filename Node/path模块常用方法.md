### **path.basename(path[, ext]):**返回路径的最后部分

- path:string 必填 目标路径
- ext:string 可选 过滤掉以ext结尾的字符串(去扩展名)
- return:string 返回string字符串

```js
//只有参数path
var joinPath = path.basename('/foo/bar/baz/asdf/quux.html')
console.log(joinPath) /* 输出quux.html */

//带参数ext
//过滤掉以ext结尾的字符串
//转化成正则表达式：/(ext)$/g类似
var joinPath = path.basename('/foo/bar/baz/asdf/quux.html', '.html')
console.log(joinPath) /* 输出quux */
console.log(joinPath) /* 如果路径是以‘quux.html?id=1’结尾
                       * 那么将不会过滤，输出quux.html?id=1 */
```

### **path.dirname(path):**与basename相对，返回除最后一部分的前面部门目录

- path:String 必填
- return:String

```js
/*返回'E:/shishans//blogsss//src'*/
console.info(path.dirname('E:/shishans/blogsss/src/assets'))
```

### **path.extname(path)**获取扩展名

- path:String 必填
- return:String 扩展名

```js
//返回.html
console.info(path.extname('index.html'))
```

### **path.join([path1], [path2], [...]):**将多个参数值字符串结合成一个路径字符串，该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"。

```js
path.join('/foo','/bar')
// return  '/foo/bar'
```

### **path.relative(from, to):**该方法用于获取两个路径之间的相对关系

### **path.resolve([...paths]):**将一系列路径解析成绝对路径。

- esolve解析是从右到左的。
- 多个path连接时，字符串的起始位置都没有'/'，则所有的字符串接连。如果其中一个字符串的起始位置有'/'，这不再向前连接。
- ./与字符串起始位置没有任何东西时，是一致的情况。
- ../会跳过前面最近的一个字符串的连接

