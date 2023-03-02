/*
 * Description:
 * Created: 2023-02-23 09:34:34
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-02 19:45:03
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

  read(fileAbsolutePath) {
    const _file = fs.readFileSync(fileAbsolutePath, 'utf-8')
    return _file ? _file.toString() : ''
  }
}

const F = new File()
module.exports = F
