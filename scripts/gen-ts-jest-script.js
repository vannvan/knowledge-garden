#!/usr/bin/env node
/*
 * Description:  生成一个ts函数脚本，同时生成对应的test脚本框架
 * Created: 2023-02-23 09:21:01
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-28 19:36:11
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const path = require('path')

const inquirer = require('inquirer')

const dayjs = require('dayjs')

const F = require('./file')

const BASE_DIR = path.resolve('./Iteration/Codes')

const DIR_OPTS = [
  {
    value: 'Algorithm',
    name: 'Algorithm',
  },
  {
    value: 'DataStructure',
    name: 'DataStructure',
  },
  {
    value: 'Leetcode',
    name: 'Leetcode',
  },
  {
    value: 'JSFunction',
    name: 'JSFunction',
  },
]

console.log('BASE_DIR', BASE_DIR)

const inquireHandler = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        message: '请选择目录',
        name: 'targetDir',
        choices: DIR_OPTS,
        default: 'Algorithm',
      },
      {
        type: 'input',
        message: '请输入方法名称',
        name: 'fileName',
        default: process.argv[2],
      },
      {
        type: 'input',
        message: '请输入方法描述',
        name: 'description',
      },
    ])
    .then(async (answer) => {
      console.log(answer)
      const { targetDir, fileName, description } = answer
      genFile(answer)
    })
}

const genFile = (targetDir, fileName, description) => {
  if (!fileName) {
    console.log('方法名称无效')
    process.exit(0)
  }

  const _targetDir = path.resolve(BASE_DIR, targetDir)

  const regMap = {
    createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    functionName: fileName,
    depict: description,
  }

  const jestPath = path.resolve('./scripts/template/tests/functionName.test.ts')

  const functionPath = path.resolve('./scripts/template/functionName.ts')

  const regex = /createTime|functionName|depict/gi

  const testsContent = F.read(jestPath).replace(regex, (matched) => regMap[matched])

  const functionContent = F.read(functionPath).replace(regex, (matched) => regMap[matched])

  F.touch(`${_targetDir}/tests`, `${fileName}.test.ts`, testsContent)

  F.touch(`${_targetDir}`, `${fileName}.ts`, functionContent)
}

// 至少要有目录索引和名称
if (process.argv.length >= 4) {
  const [dirIndex, fileName, description = '方法描述'] = process.argv.slice(2)
  let targetDir = DIR_OPTS[0].name
  // const dirName = DIR_OPTS[]
  // 如果是数字的处理方式
  if (/\d/.test(dirIndex) && dirIndex > -1 && dirIndex <= DIR_OPTS.length - 1) {
    targetDir = DIR_OPTS[dirIndex].name
  }

  // 如果是字母的处理方式
  if (/\w+/.test(dirIndex)) {
    let reg = new RegExp('^' + dirIndex.toUpperCase() + '\\w+')
    let match = DIR_OPTS.find((item) => reg.test(item.name))
    if (!match) {
      console.log('没匹配到目录哟～～')
    }
    targetDir = match ? match.name : targetDir
  }

  if (targetDir && fileName) {
    genFile(targetDir, fileName, description)
  } else {
    console.log('传参有误，开始询问模式～～')
    inquireHandler()
  }
} else {
  inquireHandler()
}
