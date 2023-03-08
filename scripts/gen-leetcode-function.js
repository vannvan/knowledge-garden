/*
 * Description: 根据链接生成leetcode函数和jest脚本，query查询参数可调整
 * 接受第一个参数为leetcode题目链接，第二个参数为函数后缀(可选)
 * Created: 2023-03-01 09:25:16
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-08 21:15:11
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const chalk = require('chalk')
const https = require('https')
const path = require('path')
const dayjs = require('dayjs')
const log = console.log
const F = require('./file')

const { exec } = require('child_process')

// 首字母大写
function titleCase(str) {
  newStr = str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
  return newStr
}

// 查询参数
const QUERY =
  'query questionData($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    categoryTitle\n    boundTopicId\n    title\n    titleSlug\n     translatedTitle\n    translatedContent\n    isPaidOnly\n    difficulty\n    likes\n    dislikes\n    isLiked\n    similarQuestions\n      topicTags {\n      name\n      slug\n      translatedName\n      __typename\n    }\n    codeSnippets {\n      lang\n      langSlug\n      code\n      __typename\n    }\n    stats\n     solution {\n      id\n      canSeeDetail\n      __typename\n    }\n    status\n    sampleTestCase\n  jsonExampleTestcases\n  metaData\n       }\n}'

// leetcode链接
const LEETCODE_URL = process.argv[2]

// 自定义函数后缀
const functionSuffix = process.argv[3] ? titleCase(process.argv[3]) : ''

if (!LEETCODE_URL) {
  log(chalk.red('无效链接!!!'))
  process.exit(0)
}

const BASE_DIR = path.resolve('./Iteration/Codes')

const urlArr = LEETCODE_URL.split('/').filter(Boolean)

const titleSlug = urlArr[urlArr.length - 1]

const queryArgs = JSON.stringify({
  operationName: 'questionData',
  variables: {
    titleSlug: titleSlug,
  },
  query: QUERY,
})

const options = {
  hostname: 'leetcode.cn',
  port: 443,
  path: '/graphql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': queryArgs.length,
  },
}

const req = https.request(options, (res) => {
  // console.log(`statusCode: ${res.statusCode}`)
  if (res.statusCode != 200) {
    log(chalk.red('leetcode请求错误，请检查链接或排查其他请求参数'))
    process.exit(0)
  }
  let chunks = []
  res.on('data', (d) => {
    chunks.push(d)
  })
  res.on('end', () => {
    let buffer = Buffer.concat(chunks)
    // console.log(buffer.toString())
    let a = buffer.toString()
    const { data } = JSON.parse(a)
    if (!data.question) {
      log(chalk.red('请确认链接是在做题页面获取的!!!'))
      process.exit(0)
    }
    const { translatedTitle, topicTags, codeSnippets, metaData, jsonExampleTestcases, questionId } =
      data.question

    const tsCode = codeSnippets.find((item) => item.lang == 'TypeScript')

    // 测试用例
    // console.log('测试用例', jsonExampleTestcases)

    // 函数名称
    const functionName = JSON.parse(metaData).name + functionSuffix

    // 函数模版路径
    const functionTemplatePath = path.resolve('./scripts/template/leetcodeFunction.ts')

    // 函数测试路径
    const functionJestTemplatePath = path.resolve(
      './scripts/template/tests/leetcodeFunction.test.ts'
    )
    const REG_MAP = {
      CREATETIME: dayjs().format('YYYY-MM-DD HH:mm:ss'), // 创建时间
      FUNCTION_NAME: functionName, // 函数名称
      DESCRIPTION: `${questionId}：` + translatedTitle, // 描述
      LEETCODE_URL: LEETCODE_URL, // leetcode 链接
      TOPIC_TAGS: topicTags.map((el) => el.translatedName).join('  '), // 题目标签
    }

    const regex = new RegExp(Object.keys(REG_MAP).join('|'), 'g')

    let functionContent = F.read(functionTemplatePath).replace(regex, (matched) => REG_MAP[matched])

    let jestContent = F.read(functionJestTemplatePath).replace(regex, (matched) => REG_MAP[matched])

    // 匹配大括号内容
    const bracketReg = /(?<=\{)(\n+|\s+)(?=\})/g // 匹配中间的换行符或空白符

    let replacedCode = tsCode.code.replace(
      bracketReg,
      '\n // Think for yourself for 5 minutes... \n'
    )

    // 再将原函数名称替换为新的函数名称,因为可能有自定义后缀
    let nameReg = new RegExp(JSON.parse(metaData).name)
    replacedCode = replacedCode.replace(nameReg, functionName)

    functionContent += '\n  ' + replacedCode + '\n ' + `export default ${functionName}`

    let testExampleCases = `\t expect(${functionName}())`

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
      `import ${functionName} from '../${functionName}' \n` +
      `describe('${translatedTitle} 测试', () => { \n` +
      `\tit('${functionName} function', () => { \n` +
      `${testExampleCases} \n` +
      `\t}) \n` +
      `})\n`

    const _targetDir = path.resolve(BASE_DIR, 'Leetcode')

    const isExit = F.isExit(`${_targetDir}/${functionName}`)

    // 如果方法已存在同名的加个_plus
    const fileName = isExit ? functionName + '_plus' : functionName
    F.touch(`${_targetDir}`, `${fileName}.ts`, functionContent)
    F.touch(`${_targetDir}/tests`, `${fileName}.test.ts`, jestContent)

    setTimeout(() => {
      // 代码格式化
      exec(
        `npx prettier --write ${_targetDir}/${functionName}.ts  ${_targetDir}/tests/${functionName}.test.ts`
      )
      log(chalk.green(`【${translatedTitle} 】方法已生成，开始做题吧！加油！！！`))
    }, 100)
  })
})

req.on('error', (error) => {
  console.error(error)
})

req.write(queryArgs)
req.end()
