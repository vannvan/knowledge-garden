#!/usr/bin/env node
import dayjs from 'dayjs'

import { exec as exec2 } from 'child_process'

const diffCommand = 'git diff --name-only'

import chalk from 'chalk'

const log = console.log

/**
 * 打印日志
 */
const Log = {
  error: (text) => log(chalk.red(text)),
  info: (text) => log(chalk.white(text)),
  success: (text) => log(chalk.green(text)),
  warn: (text) => log(chalk.yellow(text)),
}

const commitMessage = dayjs().format('YYYY-MM-DD HH:mm:ss')

const cmd = ['git add .', `git commit -am "${commitMessage}"`, 'git push']

exec2('git pull -p', 'utf8', (err, stdout, stderr) => {
  if (err) {
    Log.error(err)
  } else {
    //   const commitMessage = dayjs().format('YYYY-MM-DD HH:mm:ss')
    //   if (exec2('git add .').code !== 0) {
    //     Log.error('Error: Git add failed')
    //     process.exit(1)
    //   }
    //   if (exec2(`git commit -am "${commitMessage}"`).code !== 0) {
    //     Log.error('Error: Git commit failed')
    //     process.exit(1)
    //   }
    //   if (exec2('git push').code !== 0) {
    //     Log.error('Error: Git push failed')
    //     process.exit(1)
    //   }
    //   Log.success('提交成功！')
    // }
    Log.success('同步远程成功')
    const task = cmd.map((item) => {
      return new Promise((resolve, reject) => {
        exec2(item, 'utf-8', function (err, sto) {
          if (err) {
            Log.error(err)
            reject(err)
          } else {
            resolve(`[${item}] success`)
          }
        })
      })
    })
    Promise.allSettled(task).then((results) => {
      results.map((item) => {
        Log.info(item.status)
      })
    })
  }
})
