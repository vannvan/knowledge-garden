#!/usr/bin/env node
/*
 * Description:  生成一个ts函数脚本，同时生成对应的test脚本框架
 * Created: 2023-02-23 09:21:01
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-23 23:05:55
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
  ])
  .then(async (answer) => {
    console.log(answer)
    const { targetDir, fileName } = answer
    const _targetDir = path.resolve(BASE_DIR, targetDir)

    const map = {
      createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      functionName: fileName,
    }

    // const _renderContent = F.read(renderFilePath).replace(/\${name}|\${version}/gi, (matched) => map[matched]);

    const testsContent = F.read(
      path.resolve('./scripts/template/tests/functionName.test.ts')
    ).replace(/createTime|functionName/gi, (matched) => map[matched])
    const functionContent = F.read(path.resolve('./scripts/template/functionName.ts')).replace(
      /createTime|functionName/gi,
      (matched) => map[matched]
    )

    F.touch(`${_targetDir}/tests`, `${fileName}.test.ts`, testsContent)

    F.touch(`${_targetDir}`, `${fileName}.ts`, functionContent)
  })
