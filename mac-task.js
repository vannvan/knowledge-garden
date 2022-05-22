#!/usr/bin/env node

// const fs = require("fs");

function dateToStr(datetime) {
  var dateTime = new Date(datetime);
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1; //js从0开始取
  var date = dateTime.getDate();
  var hour = dateTime.getHours();
  var minutes = dateTime.getMinutes();
  var second = dateTime.getSeconds();
  month = month < 10 ? '0' + month : month;
  date = date < 10 ? '0' + date : date;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  second = second < 10 ? '0' + second : second;
  return year + "/" + month + "/" + date + " " + hour + ":" + minutes + ":" + second;
}

// let commitMessage = dateToStr(new Date())

// fs.appendFile("commit-log.txt", `${commitMessage} \n`, err => {
//   if (!err) {
//     fs.readFile("commit-log.txt", "utf8", (err, data) => {
//       console.log(data); // Hello world
//     });
//   }
// });

// const {exec} = require('shelljs')
const exec = require('child_process').exec

exec('node push')


const now = new Date();const currentTime = `${now.getHours()}:${now.getMinutes()}`;console.log(`推送时间: ${dateToStr(new Date())}`);


