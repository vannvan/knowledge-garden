```js
/*
* @Author: vannvan <https://github.com/vannvan>
* @Date:   2019-09-12 15:28:19
* @Last Modified by:   vannvan
* @Last Modified time: 2019-09-12 15:50:07
*/
var fs = require("fs");
const componentName = "Icon"

const mkdir = (dirName) => {
	return new Promise((resolve,reject) => {
		fs.mkdir(dirName,function(error){
		    if(error){
		        console.log(error);
		        return false;
		    }
		    resolve(dirName)
		})
	})
}

const touchComponent = (componentName) => {
	return new Promise((resolve,reject) => {
		fs.writeFile(componentName,'lala',{flag:'w',encoding:'utf-8',mode:'0666'},function(err){
		     if(err){
		         console.log("文件写入失败")
		     }else{
		         console.log("文件写入成功");
		     }
		}) 
	})
}

(function() {
	mkdir(componentName)
	.then(res => {
		mkdir(`${res}/src`)
		.then(subName =>{
			touchComponent(`${componentName}/index.js`)
			touchComponent(`${subName}/componentName.vue`)
		})
	})

})()
```

