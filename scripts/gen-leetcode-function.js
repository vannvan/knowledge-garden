/*
 * Description: 根据链接生成leetcode函数和jest脚本，query查询参数可调整
 * 接受第一个参数为leetcode题目链接，第二个参数为函数后缀(可选)
 * Created: 2023-03-01 09:25:16
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-22 00:03:41
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const chalk = require('chalk')
const path = require('path')
const dayjs = require('dayjs')
const { trim } = require('lodash')
const log = console.log
const { exec } = require('child_process')

const Leetcode = require('./utils/leetcode')
const Analyse = require('./leetcode-analyse')
const F = require('./utils/file')
const CONFIG = require('./config')

// 首字母大写
function titleCase(str) {
  newStr = str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
  return newStr
}

/**
 * lc题目连接
 */
const LEETCODE_URL = process.argv[2]

/**
 * 自定义函数后缀
 */
const functionSuffix = process.argv[3] ? titleCase(process.argv[3]) : ''

if (!LEETCODE_URL) {
  log(chalk.red('无效链接!!!'))
  process.exit(0)
}

;(async () => {
  const LC = new Leetcode()

  const { data } = await LC.getQuestionInfo(LEETCODE_URL)

  const { translatedTitle, topicTags, codeSnippets, metaData, jsonExampleTestcases, questionId } =
    data.question

  // ts 代码
  const tsCode = codeSnippets.find((item) => item.lang == 'TypeScript')

  // 测试用例
  // console.log('测试用例', jsonExampleTestcases)

  // 函数名称
  const functionName = JSON.parse(metaData).name + functionSuffix

  // 模版内字符串匹配替换
  const REG_MAP = {
    CREATETIME: dayjs().format('YYYY-MM-DD HH:mm:ss'), // 创建时间
    FUNCTION_NAME: functionName, // 函数名称
    DESCRIPTION: `${questionId}：` + translatedTitle, // 描述
    LEETCODE_URL: LEETCODE_URL, // leetcode 链接
    TOPIC_TAGS: topicTags.map((el) => el.translatedName).join('  '), // 题目标签
  }

  const regex = new RegExp(Object.keys(REG_MAP).join('|'), 'g')

  let functionContent = F.read(CONFIG.LC_FUNCTION_TEMPLATE).replace(
    regex,
    (matched) => REG_MAP[matched]
  )

  let jestContent = F.read(CONFIG.LC_JEST_TEMPLATE).replace(regex, (matched) => REG_MAP[matched])

  // 匹配大括号内容
  const bracketReg = /(?<=\{)(\n+|\s+)(?=\})/g // 匹配中间的换行符或空白符

  let replacedCode = tsCode.code.replace(bracketReg, '\n // Think for yourself for 5 minutes... \n')

  // 再将原函数名称替换为新的函数名称,因为可能有自定义后缀
  let nameReg = new RegExp(JSON.parse(metaData).name)
  replacedCode = replacedCode.replace(nameReg, functionName)

  // 函数体
  functionContent += '\n  ' + replacedCode + '\n ' + `export default ${functionName}`

  // 测试方法
  let testExampleCases = `\t expect(${functionName}())`

  const isExit = F.isExit(`${CONFIG.LC_TOPIC_DIR}/${functionName}.ts`)
  isExit && log(chalk.green(`方法已存在，将创建新的方法名称...`))

  // 如果相同方法名已存在，统计该方法名称出现的次数，生成新的文件名称
  const genSymbolFunctionName = async () => {
    let files = await F.readDirectory(`${CONFIG.LC_TOPIC_DIR}`, (name) => !/tests/.test(name))
    const count = files.filter((item) => new RegExp(functionName).test(item)).length
    const symbol = Array(count + 1)
      .fill('I')
      .join('')
    log(chalk.green(`新方法名称为${functionName + '_' + symbol}`))
    return functionName + '_' + symbol
  }

  const fileName = trim(isExit ? await genSymbolFunctionName() : functionName)
  // 测试用例
  if (jsonExampleTestcases) {
    testExampleCases = JSON.parse(jsonExampleTestcases)
      .map((el) => {
        const params = el.replace(/\n/, ',')
        return `expect(${functionName}(${params}))`
      })
      .join('\n')
  }

  jestContent +=
    `import ${functionName} from '../${fileName}' \n` +
    `describe('${translatedTitle} 测试', () => { \n` +
    `\tit('${functionName} function', () => { \n` +
    `${testExampleCases} \n` +
    `\t}) \n` +
    `})\n`

  F.touch(`${CONFIG.LC_TOPIC_DIR}`, `${fileName}.ts`, functionContent)
  F.touch(`${CONFIG.LC_TOPIC_DIR}/tests`, `${fileName}.test.ts`, jestContent)

  setTimeout(() => {
    // 代码格式化
    exec(
      `npx prettier --write ${CONFIG.LC_TOPIC_DIR}/${fileName}.ts  ${CONFIG.LC_TOPIC_DIR}/tests/${fileName}.test.ts`
    )
    // 更新纪录
    const An = new Analyse()
    An.do(LEETCODE_URL, `${fileName}.ts`)

    // 打开文件
    exec(`code ${CONFIG.LC_TOPIC_DIR}/${fileName}.ts`)
    exec(`code ${CONFIG.LC_TOPIC_DIR}/tests/${fileName}.test.ts`)

    log(chalk.green(`【${translatedTitle} 】方法已生成，开始做题吧！加油！！！`))
  }, 100)
})()
