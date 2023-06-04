## 安防运用实例

```js
#!/usr/bin/env node
process.stdin.setEncoding('utf8');
const compressing = require('compressing');
const inquirer = require('inquirer');
const promptList = [
        {
					type:'list',
          name: 'area',
          message: '地区缩写:',
					choices:['zj','gz','jx']
        },
        {
					type: 'list',
			    name: 'type',
			    message: '部署环境:',
			    choices: ['test', 'online','preon']
        }
]
const prefixName = 'web_';  //默认压缩包前缀
const time = formatDateToString(new Date());

inquirer.prompt(promptList).then((answers) => {
	let area = answers.area
	let type = answers.type
	var	name = area + prefixName + type + '_' + time
	toZip(name)
})


function formatDateToString(date){
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var hour = date.getHours();
	let fm = month < 10 ? '0' + month: month;
	let fd = day < 10 ? '0' + day: day;
	let fh = hour < 10 ? '0' + hour: hour;
  return fm+fd+fh
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
```

## 脚手架运用实例

```
#!/usr/bin/env node
const fs = require('fs');
const program = require('commander');
const download = require('download-git-repo');
const handlebars = require('handlebars');
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');
const shell = require("shelljs");
const getGitUser = require("../lib/git-user");

const author = getGitUser()

var setDefault = ''
if(author) {
    setDefault = author
}
const promptList = [
        {
          name: 'description',
          message: 'Project description:',
          default: 'A Vue.js project'
        },
        {
          name: 'author',
          message: 'Project author:',
          default: setDefault
        }
      ]
program.version('1.0.6', '-v, --version')
  .command('init <name>')
  .action((name) => {
    if(!fs.existsSync(name)){
      inquirer.prompt(promptList).then((answers) => {
        const spinner = ora('正在下载模板...');
        spinner.start();
        download('https://github.com:vannvan/wvue-cli#1.x', name, {clone: true}, (err) => {
          if(err){
            spinner.fail();
            console.log(symbols.error, chalk.red(err));
          }else{
            spinner.succeed();
            const fileName = `${name}/package.json`;
            const meta = {
              "name":name,
              "description": answers.description,
              "author": answers.author
            }
            if(fs.existsSync(fileName)){
              const content = fs.readFileSync(fileName).toString();
              const result = handlebars.compile(content)(meta);
              // console.log(result)
              fs.writeFileSync(fileName, result);
            }
            console.log(symbols.success, chalk.green('项目初始化完成'));
          }
        })
      })
    }else{
      console.log(symbols.error, chalk.red('项目已存在'));
    }
  })
program.parse(process.argv);
```





[prompts](https://www.npmjs.com/package/prompt)

![image-20220804165043214](https://tva1.sinaimg.cn/large/e6c9d24egy1h4utzu3xdxj21k40u0442.jpg)
