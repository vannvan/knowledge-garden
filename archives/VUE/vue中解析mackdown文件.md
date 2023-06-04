1）安装

​	npm install text-loader --save

2）在webpack.base.config.js中添加
	{
		test: /.md$/,
		loader: ‘text-loader’
	}
然后通过import READMD from ‘./README.md’，即可正确获取.md文件中的md原始内容。

3）安装md解析器如vue-markdown，

​	npm install vue-markdown --save
vue文件代码如下：

```vue
<template>
    <div>
        <h1>document</h1>
        <vue-markdown>{{msg}}</vue-markdown>
    </div>
</template>
<script>
import VueMarkdown from 'vue-markdown';
import README from './README.md';
export default {
    name:'document',
    components:{
        VueMarkdown
    },
    data(){
        return{
            msg:README
        }
    },
    methods:{

    }
}
</script>

```







