#!/usr/bin/env node

/*
 * @Author: wanwan
 * @Date:   2019-07-15 18:16:58
 * @Last Modified by:   vannvan
 * @Last Modified time: 2019-08-02 09:45:21
 */

const dayjs = require('dayjs')
const shell = require('shelljs')
const exec = shell.exec
const echo = shell.echo
const chalk = require('chalk')
const log = console.log

const exec2 = require('child_process').exec

const diffCommand = 'git diff --name-only'

// TODO
// exec2(diffCommand, 'utf8', (err, stdout, stderr) => {
//   if (err) {
//     console.log('err:', err)
//     console.log('stderr:', stderr)
//   } else {
//     const fileArr = stdout.split('\n')

//     log(chalk.green('fileArr', fileArr))
//   }
// })

exec2('git pull -p', 'utf8', (err, stdout, stderr) => {
  if (err) {
    log(chalk.red(err))
  } else {
    const commitMessage = dayjs().format('YYYY-MM-DD HH:mm:ss')
    if (exec('git add .').code !== 0) {
      log(chalk.red('Error: Git add failed'))
      exit(1)
    }
    if (exec(`git commit -am "${commitMessage}"`).code !== 0) {
      log(chalk('Error: Git commit failed'))
      exit(1)
    }
    if (exec('git push').code !== 0) {
      log(chalk('Error: Git push failed'))
      exit(1)
    }
    log(chalk.green('提交成功！'))
  }
})
