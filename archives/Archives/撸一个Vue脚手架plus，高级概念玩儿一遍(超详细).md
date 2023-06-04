###  写在前面

一个不够“懒”的程序员不是好程序员。  --------鲁迅

### 从造轮子说起

相信每个一个程序员都不希望花过多的时间去造没必要造的轮子（纯粹为了学习的略过），经过不断的成长和经验的积累，我们总得造出一些有意义的可以长期使用的“轮子”（因为没有现成的，哈哈🤣），也就是大家都将求的代码的复用性。

此篇文章主要分享一下我是怎样省去每次初始化Vue项目的那几十分钟。

先让我们回忆一下初始化Vue项目的步骤：

> vue init webpack project-name
>
> npm/cnpm install ....
>
> 修改webpack配置
>
> 删除vue-cli初始化页面
>
> 修改main.js,配置第三方插件
>
> 新建好多文件夹
>
> 等等...

总之，这一通下来体验是真的极其不好，除非有些人就喜欢重复这样无趣的操作，PS:也有人可能扒一份之前的项目删删改改、缝缝补补也算是初始化了一个新项目，but，这真不是优雅的方式。🤔

### 何谓脚手架plus

我们学习或借用外来资源主要还是会取其精华、弃其糟粕的，所以在vue-cli3的基础上，我们先把它本身容易有坑的地方解决，再进一步完善和增加我们自己的需求，这样就满足我们的长期需求了。

那么本篇文章在分享如何构建项目框架的同时，还会分享到Vue高级概念`Mixins`、`directive` 、`过滤器`、`vuex管理`等方法的基础使用方式。

### 先提一下需求

- 静态资源存放位置统一管理
- 公共样式管理、字体库、第三方脚本统一管理
- 开箱即用的sass
- router统一管理
- vuex模块化管理 store
- 接口统一管理  urlconfig
- 公共指令基础配置 directive
- 全局混入基础配置 mixins
- 自定义组件导出和引入 
- 命令行打包压缩  
- 命令行一步push本地仓库
- 自动获取局域网ip，打开局域网server
- 等等...

### 实现一下需求

像静态资源、公共样式、router这些最基础的项目组成可能就仁者见仁智者见智了，每个人有自己存放位置的习惯和风格，这里展示一下我的项目构成大家就一目了然了，毕竟这些都不是重点。😶

![](https://github.com/vannvan/wvue-cli/blob/master/src/assets/images/Catalog.png?raw=true)

### 怎样实现sass的全局引入

首先在assets/scss下新建文件common.scss,再修改`utils.js`引入commom.css,就不用在main.js 或其他项目中的页面引入了

```js
//57行开始
function resolveResouce(name) {
    return path.resolve(__dirname, '../src/assets/scss/' + name);
}
  function generateSassResourceLoader() {
      var loaders = [
       cssLoader,
       // 'postcss-loader',
       'sass-loader',
       {
           loader: 'sass-resources-loader',
           options: {
             resources: [resolveResouce('common.scss')]    
           }
       }
      ];
      if (options.extract) {
       return ExtractTextPlugin.extract({
         use: loaders,
         fallback: 'vue-style-loader'
       })
          } else {
       return ['vue-style-loader'].concat(loaders)
          }
  }
  // 注意这里
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateSassResourceLoader(),
    scss: generateSassResourceLoader(),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
```

完成以上配置，就能在项目中的任何页面疯狂的飙车了。

### 接口统一化管理

如果是多人参与的项目，就不得不对接口进行统一管理，当然就算是一个人也是非常有必要的，因为这样不至于后期因为后端一个小小的接口改动导致牵一发而动全身。

配置参照形式

```js
// 开发环境用config下proxyTable的代理地址
var BASE_URL = '/api';
var isPro = process.env.NODE_ENV === 'production'
if(isPro){
    BASE_URL= 'http://113.113.113.113:8011'  //生产环境下的地址
}

const UrlConfig = {
  getUserInfo:BASE_URL +'user/getinfo',  //获取用户信息
}
export default {
  UrlConfig
};
```

使用方式之一,在main.js中将UrlConfig挂载到Vue原型

> import URL_CONFIG from '@/assets/js/urlConfig.js';
>
> Vue.prototype.$url = URL_CONFIG.UrlConfig

然后在页面使用

> this.$url.getUserInfo

这样就能将接口统一管理，而且不用在每次上线打包都去对base_url进行改动了（生产环境多的除外），同时在多人协作开发的过程中也不会出现生成多种接口管理形式的情况，为合并代码时的冲突减少一定的隐患。

### Mixins管理

简单来讲`Mixins`就是我们可以重复使用的代码，在功能模块比较多的项目中有很多重复的方法是必然存在的，由很多种方法可以帮我们抽离这些可复用的代码，但是Vue中提供了一种比较好的特性之一就是`Mixins`,它可以使用任何我们在页面中定义的`methods`、`data` 、`mounted`等方法。

定义一个formatTime.js的mixin，将它使用在一些我们需要转换时间戳的页面，例如：

```js
const formatTime = {
     methods: {
     //像时间戳转换这种方法大多数项目都能用的到，可以写在filter里也可以写在computed里，取决于运用场景
      formatTime(date, fmt) {
          if (/(y+)/.test(fmt)) {
              fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
          }
          let o = {
              'M+': date.getMonth() + 1,
              'd+': date.getDate(),
              'h+': date.getHours(),
              'm+': date.getMinutes(),
              's+': date.getSeconds()
          };
          for (let k in o) {
              if (new RegExp(`(${k})`).test(fmt)) {
                  let str = o[k] + '';
                  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
              }
          }
          return fmt;
      },
      padLeftZero(str) {
          return ('00' + str).substr(str.length);
      },
    }
}
export default formatTime
```

然后在页面中使用

> import formatTime from '路径'
>
> mixins:['formatTime']

这样我们就算把具有重复方法的代码在局部页面抽离了，当然以上示例只是简单说明`Mixins`的基本使用方法，像转换时间戳还有更优雅的方法，具体怎样使用还是得结合场景去构建。

另外一种就是在项目中每个页面或者说绝大多数页面都能够使用到的方法，这时候我们就可以考虑一下将它挂载到原型，以便进行更便捷的使用，例如一个全局使用的`Mixins`有如下方法：

```js
loadPage(path,params){
        this.$router.push({
          path:path,
          query:params
        })
}
```

那么我们将他在main.js中引入

> import globalMixins from '@/components/common/mixins'  
>
> Vue.mixin(globalMixins )

### directive管理

全局指令就是Vue允许用户自定义一些常用的对DOM进行底层操作的方法，诸如`v-for`、`v-if`这些指令。它可以帮我们实现什么。举个栗子：我们需要给统一一下网页各类元素的背景色以及`primary`、`danger`、`error`这样类似主题的颜色，我们可能会用sass/less写一套样式变量，再定义class以控制统一的颜色。

我们用自定义指令实现一下它：

```js
let mydirective = {}
mydirective.install = function (Vue) {
  //背景颜色
  Vue.directive('bg', {
    bind(el, binding) {
        el.style.color = '#f6f6f6';
    }
  }),
  //主题色
  Vue.directive('color', {
    bind(el, binding) {
        el.style.color = '#42E5D3';
    }
  }),
  Vue.directive('theme',function(el){
    el.style.color = '#42E5D3'
    el.style.background = '#f6f6f6'
  }),
  // 图片未加载完之前先用随机背景色占位
  Vue.directive('img', {
  inserted:function (el, binding) {
    var color = Math.floor(Math.random()*1000000);
    el.style.backgroundColor = "#" + color;
    var img = new Image();
    img.src = binding.value;
    img.onload = function(){
      el.style.backgroundImage = 'url('+ binding.value +')'
    }
  }
  })
}
export default mydirective;
```

在main.js中引入并挂载到全局

> import globalDirective from '@/components/common/directive'  
>
> Vue.use(globalDirective )  

然后在页面中我们就可以像用`v-for`、`v-if`这样的方法去使用`v-bg`、`v-color`、`v-theme`了，当然有人可能会讲自定义指令这样用有点大材小用了，用sass和统一的class去管理项目的主题等基础配置也是很好的。还是那句话，结合场景谈业务才不算耍流氓，😉当然自定义指令还有更多高级的用法，可以参考Vue文档去实现更多自己的业务逻辑。

### 命令行打包压缩

这个需求可能仅仅是我个人的需求，因为一直以来我的目标是能使用键盘就尽量不使用鼠标去操作电脑的，对命令行操作那更是无以用言语描述😊,因为比较喜欢linux,虽然我是一个前端,废话少说实现一下.

首先我们需要`compressing`这个插件,在build文件夹下建一个zip.js

compressing插件压缩成zip文件的最基础使用方式是这样的,

```js
compressing.zip.compressDir('dist', 'dist.zip')
  .then(() => {
	process.exit()
  })
  .catch(err => {
    console.error(err);
  });
```

但是我们能不能每次压缩文件用让执行命令的时候输入呢,同时让文件名更有标识性,不然每次都是dist.zip,加入我们需要备份文件岂不是很尴尬.

首先要实现命令行提示和输入文件名要用到node的`stdout`和`stdin`,如下:

```js
process.stdout.write(`请输入压缩文件名:`)
process.stdin.resume()
process.stdin.on('data', (chunk) => {
	chunk = chunk.toString().trim();  //输入的文件名
    //输入完要做的事
});
```

再增加一项需求,有时候我不想输入文件名,但是我还要压缩文件名格式统一且尽量保证名称不会重复.

最后实现一下这个比较个性的需求,代码上😁

```js
#!/usr/bin/env node
process.stdin.setEncoding('utf8');
const compressing = require('compressing');
const prefixName = 'wvue-cli_';  //默认压缩包前缀
function formatDateToString(date){
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var hour = date.getHours();
	month < 10 ? '0' + month: month;
	day < 10 ? '0' + day: day;
	hour < 10 ? '0' + hour: hour;
	return month+day+hour;  //想要绝对性的不重复可以直接精确到毫秒
}
function toZip(name){
	compressing.zip.compressDir('dist', `${name}.zip`)
  .then(() => {
    console.log( `${name}.zip`+'已保存至项目目录！');
		process.exit()
  })
  .catch(err => {
    console.error(err);
  });
}
const time = formatDateToString(new Date());
process.stdout.write(`请输入压缩文件名:`)
process.stdin.resume()
process.stdin.on('data', (chunk) => {
	chunk = chunk.toString().trim();  //输入的文件名
  var	name = chunk || prefixName + time;
	toZip(name)
});
process.stdin.on('end', () => {
  process.stdout.write('结束');
});
//压缩文件名形如wvue-cli_062110.zip这样
```

然后在我们的package.json添加,使用方式如下

> "pack": "node build/zip.js" 
>
> npm run pack zipname

### 命令行一步提交代码

做完一项需求或者改完一些bug了我们需要提交一次代码,可能得`git add` `git commit` `git push`一顿操作,but我们懒呀,(请不要跟我讲图形化工具或者编辑器自带插件,我需要命令行🙄)

这里我们需要shelljs,这个插件在vue-cli中是默认安装在我们项目的dev环境中的,所以不用自己安装,实现方式如下

```js
#!/usr/bin/env node
var name = process.argv[2] || 'auto-commit';
var shell = require("shelljs");
var exec = shell.exec;
var echo = shell.echo;

if (exec('git add .').code !== 0) {
  echo('Error: Git add failed');
  exit(1);
}
if (exec(`git commit -am "${name}"`).code !== 0) {
  echo('Error: Git commit failed');
  exit(1);
}
if (exec('git push').code !== 0) {
  echo('Error: Git push failed');
  exit(1);
}
//绿色字体
echo('-e',"\033[0;32m git success \033[0m"+`${name}`);

```

然后方法类似压缩文件,在package.json里添加执行命令的方法.

> "push": "node build/push.js",
>
> npm run push  "修复了一些bug"

至此,一个比较全面的脚手架plus就撸完了,我们也实现了那么些开发过程中很常见很实用的需求,从此撸代码也可以比别人快一步,至少不用把时间浪费在初始化项目这件繁琐且浪费感情的事情上,因为我们`懒`😏.

### 最后

文章中部分功能的实现过程由于篇幅限制不能完整展示,还有一些像自定义全局组件这样的方法没有体现到,实属抱歉,如有交流或者参考可以去github上拉我的代码,或者通过npm直接安装一下脚手架,本人青铜选手如有建议还请同行批评指正~😊

github地址

> <https://github.com/vannvan/wvue-cli> 

npm 安装及使用方法

> npm i wwvue-cli -g
>
> wwvue init project-name

最最后,叩谢走过路过的各位开发者花时间看我扯完这么些有的没的的东西~🤡

