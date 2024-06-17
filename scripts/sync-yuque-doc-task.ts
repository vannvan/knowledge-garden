/*
 * Description: 语雀文档同步
 * Created: 2023-06-17 13:33:30
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2024-06-17 16:27:31
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import { spawn } from 'child_process'
import dayjs from 'dayjs'
import { cpSync, lstatSync, readdirSync, writeFileSync } from 'fs'
import path from 'path'

class SyncYuque {
  ytoolExtendArgs: string[]
  monthlyBaseUrl: string
  vannvan: string
  constructor() {
    this.ytoolExtendArgs = ['技术迭代/技术月刊', 'skip', 'lb']
    this.vannvan = 'https://github.com/vannvan'
    this.monthlyBaseUrl =
      this.vannvan + '/knowledge-garden/tree/master/Iteration/%E6%8A%80%E6%9C%AF%E6%9C%88%E5%88%8A'
  }

  start() {
    const args = process.argv

    if (args.length < 2) {
      console.log('参数无效,任务退出')
      process.exit(0)
    }
    console.log('开始执行 ytool任务')

    const [, , userName, password] = args

    // 本地的逻辑

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
    const sourceDir = path.resolve('docs/技术迭代/技术月刊')
    const targetDir = path.resolve('Iteration/技术月刊')

    cpSync(sourceDir, targetDir, { recursive: true })

    const list: string[] = await this.readDirectory(targetDir)

    const docList = list
      .filter((item) => !/README/.test(item))
      .map((item) => {
        return item.split('/').at(-1)
      })

    const baseUrl = this.monthlyBaseUrl

    let content = `# vannvan的技术月刊 \n## 月刊目录\n`

    content += docList
      .sort((a: any, b: any) => b.replace(/\D/g, '') - a.replace(/\D/g, ''))
      .map((item) => {
        return `- [${item}](${baseUrl}/${item})`
      })
      .join('\n')

    content += `\n## 最近更新时间 \n ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`

    writeFileSync(`${targetDir}/README.md`, content)
    console.log('目录更新成功')
  }

  /**
   * 获取文件列表
   * @param pathName
   * @returns
   */
  readDirectory(pathName: any): Promise<string[]> {
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
