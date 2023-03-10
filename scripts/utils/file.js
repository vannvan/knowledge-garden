/*
 * Description:
 * Created: 2023-02-23 09:34:34
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-10 17:16:22
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
/**
 * 文件操作
 */
const { exec, exit } = require('shelljs')
const fs = require('fs')
const log = console.log
const chalk = require('chalk')
const path = require('path')

class File {
  mkdir(absolutePath) {
    const isExit = fs.existsSync(absolutePath)
    if (isExit) {
      // console.log(`${absolutePath}文件夹已存在`)
    } else {
      exec(`mkdir ${absolutePath}`)
    }
  }

  touch(absolutePath, fileName, content) {
    this.mkdir(absolutePath)
    const _fileName = `${absolutePath}/${fileName}`
    fs.writeFile(`${_fileName}`, content, (error) => {
      if (error) return console.log(`${_fileName}写入文件失败,原因是` + error.message)
      log(chalk.green(`${_fileName}创建成功`))
    })
  }

  // 文件是否已存在，需要完整路径
  isExit(fullPath) {
    return fs.existsSync(fullPath)
  }

  read(fileAbsolutePath) {
    const _file = fs.readFileSync(fileAbsolutePath, 'utf-8')
    return _file ? _file.toString() : ''
  }

  async readDirectory(pathName, filterCallback) {
    if (!this.isExit(pathName)) {
      log(chalk.red('路径无效'))
      return
    }

    return new Promise((resolve) => {
      const list = []
      const each = (pathName) => {
        fs.readdirSync(pathName).forEach((item, index) => {
          let stat = fs.lstatSync(path.join(pathName, item))
          if (stat.isDirectory()) {
            each(path.join(pathName, item))
          } else if (stat.isFile()) {
            // console.log('item', item, 'pathName', pathName)
            // list.push(item)
            const fullPathName = pathName + '/' + item
            if (
              filterCallback &&
              typeof filterCallback == 'function' &&
              filterCallback(fullPathName)
            ) {
              list.push(fullPathName)
            }
            // console.log('fullPathName', fullPathName)
          }
        })
      }

      // return list
      each(pathName)
      resolve(list)
    })
  }
}

const F = new File()
module.exports = F
