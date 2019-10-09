```js
#!/usr/bin/env node
/*
* @Author: vannvan <https://github.com/vannvan>
* @Date:   2019-10-09 10:22:08
* @Last Modified by:   vannvan
* @Last Modified time: 2019-10-09 10:28:38
*/
const fs = require( "fs" );
const chalk = require("chalk");
const argv = process.argv;

/**
 *  copy main function
 *
 * @param  {String} from which file or directory you wanna copy
 * @param  {String} to   the target file or dir you copyed
 */
async function copy(from, to) {
	if(!from){
		console.log(error("pleace input the file or directory you wanna copy"));
		return ;
	}
	try{
		if(from === "--help"){
			help();
			return;
		}
		await isExist(from);
		if(!to){
			console.log(error("pleace  the target file or directory you wanna copy"));
			return;
		}
		const type = await pathType(from);
		if(type == "file"){
			copyFile(from ,to); // file copy
		}else{
			copyDir(from,to); // directory copy
		}
	}catch(err){
		console.log(error(err));
	}
}

// execute copy
// copy(argv[2],argv[3]);
copy('../src','../backup/src'+formatDateToString(new Date()));

/**
 * copy file
 *
 * @param  {String} from copied file
 * @param  {String} to   target file
 */
function copyFile(from, to) {
	fs.writeFileSync(to, fs.readFileSync(from));
	console.log(success(from,to));
}

/**
 * copy directory
 *
 * @param  {String} from
 * @param  {String} to
 */
async function copyDir(from, to) {
	console.log(chalk.green(`copy ${from} `));
	try{
		await isExist(to);
	}catch(err){
		fs.mkdirSync(to);
	}
	await fs.readdir(from, (err, paths) => {
		paths.forEach((path)=>{
			var src = `${from}/${path}`;
			var dist = `${to}/${path}`;
			fs.stat(src,(err, stat)=> {
				if(stat.isFile()) {
					fs.writeFileSync(dist, fs.readFileSync(src));
					console.log(chalk.green(` copy ${src} `));
				} else if(stat.isDirectory()) {
					copyDir(src, dist);
				}
			});
		});
	});
}

/**
 * is exists
 *
 * @param  {String} file
 * @return {Promise}
 */
function isExist(path){
	return new Promise((resolve,reject)=>{
		fs.access(path,  (err) => {
			if(err!==null){
				reject(`${path} does not exist`);
			}else{
				resolve(true);
			}
		});
	});
}

function formatDateToString(date){
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var hour = date.getHours();
	let fm = month < 10 ? '0' + month: month;
	let fd = day < 10 ? '0' + day: day;
	let fh = hour < 10 ? '0' + hour: hour;
  return fm + '-' + fd + '-' + fh
}

/**
 * file or a folder
 *
 * @param  {String} path
 * @return {Promise}
 */
function pathType(path){
	return new Promise((resolve,reject)=>{
		fs.stat(path,(err,stats)=>{
			if(err === null){
				if(stats.isDirectory()){
					resolve("dir"); // it's directory
				}else if(stats.isFile()){
					resolve("file"); // it's file
				}
			}else{
				reject(error(path)); // files or directory don't exist
			}
		});
	});
}

function help(){
	console.log(chalk.blueBright(`
options:
[from] [to]       copy [from] file or directory to [to]

example:
copy a.js b.js   copy a.js to b.js
copy dirA dirB   copy directory dirA to dirB

		`));
}


function error(msg){
	console.log('复制失败')
}

function success(from,to){
	console.log('复制成功')
}
//此方案已用作安防src文件备份
```

