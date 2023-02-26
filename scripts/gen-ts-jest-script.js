#!/usr/bin/env node
/*
 * Description:  生成一个ts函数脚本，同时生成对应的test脚本框架
 * Created: 2023-02-23 09:21:01
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-26 18:01:05
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const path = require('path')

const inquirer = require('inquirer')

const dayjs = require('dayjs')

const F = require('./file')

const BASE_DIR = path.resolve('./Iteration/Codes')

console.log('BASE_DIR', BASE_DIR)

inquirer
  .prompt([
    {
      type: 'list',
      message: '请选择目录',
      name: 'targetDir',
      choices: [
        {
          value: 'Algorithm',
          name: 'Algorithm',
        },
        {
          value: 'DataStructure',
          name: 'DataStructure',
        },
        {
          value: 'JSFunction',
          name: 'JSFunction',
        },
      ],
      default: 'Algorithm',
    },
    {
      type: 'input',
      message: '请输入方法名称',
      name: 'fileName',
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
    const _targetDir = path.resolve(BASE_DIR, targetDir)

    const regMap = {
      createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      functionName: fileName,
      description: description,
    }

    const jestPath = path.resolve('./scripts/template/tests/functionName.test.ts')

    const functionPath = path.resolve('./scripts/template/functionName.ts')

    const regex = /createTime|functionName|description/gi

    const testsContent = F.read(jestPath).replace(regex, (matched) => regMap[matched])

    const functionContent = F.read(functionPath).replace(regex, (matched) => regMap[matched])

    F.touch(`${_targetDir}/tests`, `${fileName}.test.ts`, testsContent)

    F.touch(`${_targetDir}`, `${fileName}.ts`, functionContent)
  })
