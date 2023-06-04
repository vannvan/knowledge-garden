## compressing是一个node环境下命令方式压缩文件的插件

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
	return month+day+hour;
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


```

