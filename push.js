#!/usr/bin/env node

/*
* @Author: wanwan
* @Date:   2019-07-15 18:16:58
* @Last Modified by:   wanwan
* @Last Modified time: 2019-07-15 18:18:36
*/
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
// exec(`echo git success ${name}`);

//绿色字体
echo('-e',"\033[0;32m git success \033[0m"+`${name}`);
