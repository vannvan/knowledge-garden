/*
 * Description: 根据链接生成leetcode函数
 * Created: 2023-03-01 09:25:16
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:38:00
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

// 查询参数
const QUERY =
  'query questionData($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    categoryTitle\n    boundTopicId\n    title\n    titleSlug\n     translatedTitle\n    translatedContent\n    isPaidOnly\n    difficulty\n    likes\n    dislikes\n    isLiked\n    similarQuestions\n      topicTags {\n      name\n      slug\n      translatedName\n      __typename\n    }\n    codeSnippets {\n      lang\n      langSlug\n      code\n      __typename\n    }\n    stats\n     solution {\n      id\n      canSeeDetail\n      __typename\n    }\n    status\n    sampleTestCase\n  jsonExampleTestcases\n  metaData\n       }\n}'

const LEETCODE_URL = process.argv[2]

if (!LEETCODE_URL) {
  log(chalk.red('无效链接!!!'))
  process.exit(0)
}

const BASE_DIR = path.resolve('./Iteration/Codes')

const urlArr = LEETCODE_URL.split('/').filter(Boolean)

const titleSlug = urlArr[urlArr.length - 1]

const data1 = JSON.stringify({
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
    'Content-Length': data1.length,
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
    const { translatedTitle, topicTags, codeSnippets, metaData, jsonExampleTestcases } =
      data.question

    const tsCode = codeSnippets.find((item) => item.lang == 'TypeScript')

    // 测试用例
    console.log('测试用例', jsonExampleTestcases)

    // 函数名称
    const functionName = JSON.parse(metaData).name

    // 函数模版路径
    const functionTemplatePath = path.resolve('./scripts/template/leetcodeFunction.ts')

    // 函数测试路径
    const functionJestTemplatePath = path.resolve(
      './scripts/template/tests/leetcodeFunction.test.ts'
    )
    const REG_MAP = {
      CREATETIME: dayjs().format('YYYY-MM-DD HH:mm:ss'), // 创建时间
      FUNCTION_NAME: functionName, // 函数名称
      DESCRIPTION: translatedTitle, // 描述
      LEETCODE_URL: LEETCODE_URL, // leetcode 链接
      TOPIC_TAGS: topicTags.map((el) => el.translatedName).join('  '), // 题目标签
    }

    const regex = new RegExp(Object.keys(REG_MAP).join('|'), 'g')

    let functionContent = F.read(functionTemplatePath).replace(regex, (matched) => REG_MAP[matched])

    let jestContent = F.read(functionJestTemplatePath).replace(regex, (matched) => REG_MAP[matched])

    functionContent += '\n  ' + tsCode.code + '\n ' + `export default ${functionName}`

    let testExampleCases = `\t expect(${functionName}())`

    // 测试用例
    if (jsonExampleTestcases) {
      testExampleCases = JSON.parse(jsonExampleTestcases)
        .map((el) => {
          const params = el.replace(/\n/, ',')
          console.log('params', params)
          return `expect(${functionName}(${params}))`
        })
        .join('\n')
    }

    jestContent +=
      '\n' +
      `import ${functionName} from '../${functionName}' \n` +
      `describe('${translatedTitle} 测试', () => { \n` +
      `\tit('${functionName} function', () => { \n` +
      `${testExampleCases} \n` +
      `\t}) \n` +
      `})\n`

    const _targetDir = path.resolve(BASE_DIR, 'Leetcode')

    F.touch(`${_targetDir}`, `${functionName}.ts`, functionContent)
    F.touch(`${_targetDir}/tests`, `${functionName}.test.ts`, jestContent)

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

req.write(data1)
req.end()
