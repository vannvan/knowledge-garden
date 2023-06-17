/*
 * Description: 语雀文档同步
 * Created: 2023-06-17 13:33:30
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-06-17 17:26:20
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import { spawn } from 'child_process'
import { readdirSync, lstatSync, cp } from 'fs'
import path from 'path'

class SyncYuque {
  ytoolExtendArgs: string[]
  constructor() {
    this.ytoolExtendArgs = ['技术迭代', 'skip']
  }

  start() {
    const args = process.argv

    if (args.length < 2) {
      console.log('参数无效,任务退出')
      process.exit(0)
    }
    console.log('开始执行 ytool任务')

    const [, , userName, password] = args

    const child = spawn('npx', ['ytool', 'pull', userName, password, ...this.ytoolExtendArgs], {
      shell: true,
    })

    //spit stdout to screen
    child.stdout.on('data', function (data) {
      process.stdout.write(data.toString())
    })

    //spit stderr to screen
    child.stderr.on('data', function (data) {
      process.stdout.write(data.toString())
    })

    child.on('close', (code) => {
      console.log('Finished ytool task code ' + code)
      this.handleDocument()
    })
  }

  async handleDocument() {
    console.log('开始处理文件程序')
    const sourceDir = path.resolve('docs/技术迭代/技术月报')
    const targetDir = path.resolve('Iteration/技术月报')
    cp(sourceDir, targetDir, { recursive: true }, (err) => {
      if (!err) {
        console.log('复制成功')
      }
    })
  }

  /**
   * 暂时先不要
   * @param pathName
   * @returns
   */
  readDirectory(pathName: any) {
    return new Promise((resolve) => {
      const list: string[] = []
      const each = (pathName) => {
        readdirSync(pathName).forEach((item, index) => {
          let stat = lstatSync(path.join(pathName, item))
          if (stat.isDirectory()) {
            each(path.join(pathName, item))
          } else if (stat.isFile()) {
            const fullPathName = pathName + '/' + item
            list.push(fullPathName)
          }
        })
      }

      each(pathName)
      resolve(list)
    })
  }
}

new SyncYuque().start()
