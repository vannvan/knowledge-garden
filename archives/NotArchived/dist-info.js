/**
 * 用来输出dist文件大小信息
 */
const fs = require('fs')
const path = require('path')
const log = console.log

const chalk = require('chalk')

const sourcePath = path.resolve('./dist')

function geFileList(path) {
  let filesList = []
  readFile(path, filesList)
  return filesList
}

//遍历读取文件
function readFile(path, filesList) {
  files = fs.readdirSync(path) //需要用到同步读取
  files.forEach(walk)
  function walk(file) {
    states = fs.statSync(path + '/' + file)
    if (states.isDirectory()) {
      readFile(path + '/' + file, filesList)
    } else {
      //创建一个对象保存信息
      let obj = new Object()
      obj.size = states.size //文件大小，以字节为单位
      obj.name = file //文件名
      obj.path = path + '/' + file //文件绝对路径
      filesList.push(obj)
    }
  }
}

//写入文件utf-8格式
const writeFile = (fileName, data) => {
  fs.writeFile(fileName, data, 'utf-8', (error) => {
    if (!error) {
      log(chalk.green('分析文件已生成！！！'))
    }
  })
}
let exit = fs.existsSync(sourcePath)

if (exit) {
  let filesList = geFileList(sourcePath)

  filesList.sort(sortHandler)
  function sortHandler(a, b) {
    if (a.size > b.size) return -1
    else if (a.size < b.size) return 1
    return 0
  }
  let str = `# 打包产物分析
 ----
 
 `

  // 排个序
  // filesList = filesList.sort((a, b) => a.name - b.name)

  filesList.map((item) => {
    let size = (item.size / 1024).toFixed(2)
    const LIMIT = process.argv[2] || 80
    desc = `${item.name} 大小:  ${size}kb 😀 `
    log(size < LIMIT ? chalk.green(desc) : chalk.red(desc))
    str += desc + '\n'
  })

  const countSize = filesList.reduce((prev, curr) => {
    return prev + curr.size / 1024
  }, 0)

  console.log('countSize', countSize)

  let countInfo = `\n合计大小:${countSize}kb`

  writeFile('打包产物分析.md', str)

  fs.appendFile('打包产物分析.md', countInfo, 'utf8', function (err, ret) {
    if (!err) console.log('写入成功')
  })
}
