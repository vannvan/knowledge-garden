/*
 * Description:
 * Created: 2023-02-23 09:34:34
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-21 23:47:14
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
  /**
   * 创建文件夹
   * @param {*} absolutePath
   */
  mkdir(absolutePath) {
    const isExit = fs.existsSync(absolutePath)
    if (isExit) {
      // console.log(`${absolutePath}文件夹已存在`)
    } else {
      exec(`mkdir ${absolutePath}`)
    }
  }

  /**
   * 创建文件
   * @param {*} absolutePath  绝对路径
   * @param {*} fileName 文件名称
   * @param {*} content 文件内容
   */
  touch(absolutePath, fileName, content) {
    this.mkdir(absolutePath)
    const _fileName = `${absolutePath}/${fileName}`
    fs.writeFile(`${_fileName}`, content, (error) => {
      if (error) return console.log(`${_fileName}写入文件失败,原因是` + error.message)
      // log(chalk.green(`${_fileName}创建成功`))
    })
  }

  /**
   * 删除文件
   * @param {*} fullPathName 目标文件全路径
   */
  rm(fullPathName) {
    fs.unlink(fullPathName, (error) => {
      if (error) {
        log(chalk.red(`删除${fullPathName}失败`))
        process.exit(0)
      }
    })
  }

  /**
   * 文件是否已存在
   * @param {*} fullPath 完整路径
   * @returns
   */
  isExit(fullPath) {
    return fs.existsSync(fullPath)
  }

  /**
   * 获取文件内容
   * @param {*} fileAbsolutePath 完整路径
   * @returns
   */
  read(fileAbsolutePath) {
    const _file = fs.readFileSync(fileAbsolutePath, 'utf-8')
    return _file ? _file.toString() : ''
  }

  /**
   * 异步递归遍历目标目录下的文件
   * @param {*} pathName 目标路径
   * @param {*} filterCallback // 过滤函数
   * @returns
   */
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
            const fullPathName = pathName + '/' + item
            if (
              filterCallback &&
              typeof filterCallback == 'function' &&
              filterCallback(fullPathName)
            ) {
              list.push(fullPathName)
            }
          }
        })
      }

      each(pathName)
      resolve(list)
    })
  }
}

const F = new File()
module.exports = F
