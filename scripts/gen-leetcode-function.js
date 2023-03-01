/*
 * Description: 根据链接生成leetcode函数
 * Created: 2023-03-01 09:25:16
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-01 10:58:24
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
  query:
    'query questionData($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    categoryTitle\n    boundTopicId\n    title\n    titleSlug\n    content\n    translatedTitle\n    translatedContent\n    isPaidOnly\n    difficulty\n    likes\n    dislikes\n    isLiked\n    similarQuestions\n    langToValidPlayground\n    topicTags {\n      name\n      slug\n      translatedName\n      __typename\n    }\n    codeSnippets {\n      lang\n      langSlug\n      code\n      __typename\n    }\n    stats\n    hints\n    solution {\n      id\n      canSeeDetail\n      __typename\n    }\n    status\n    sampleTestCase\n    metaData\n    judgerAvailable\n    judgeType\n    mysqlSchemas\n    enableRunCode\n    envInfo\n    isSubscribed\n    isDailyQuestion\n    dailyRecordStatus\n    editorType\n    ugcQuestionId\n    style\n    __typename\n  }\n}',
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
    const { translatedTitle, topicTags, codeSnippets, metaData } = data.question

    const tsCode = codeSnippets.find((item) => item.lang == 'TypeScript')

    // 函数名称
    const functionName = JSON.parse(metaData).name

    // 参数
    const functionParams = JSON.parse(metaData).params

    // 函数模版路径
    const functionTemplatePath = path.resolve('./scripts/template/leetcodeFunction.ts')

    // 函数测试路径
    const functionJestTemplatePath = path.resolve(
      './scripts/template/tests/leetcodeFunction.test.ts'
    )
    const REG_MAP = {
      CREATETIME: dayjs().format('YYYY-MM-DD HH:mm:ss'), // 创建时间
      FUNCTION_NAME: functionName, // 函数名称
      DEPICT: translatedTitle, // 描述
      LEETCODE_URL: LEETCODE_URL,
    }

    const regex = /CREATETIME|FUNCTION_NAME|DEPICT|LEETCODE_URL/gi

    let functionContent = F.read(functionTemplatePath).replace(regex, (matched) => REG_MAP[matched])

    let jestContent = F.read(functionJestTemplatePath).replace(regex, (matched) => REG_MAP[matched])

    functionContent += '\n  ' + tsCode.code + '\n ' + `export default ${functionName}`
    jestContent +=
      '\n' +
      `import ${functionName} from '../${functionName}' \n` +
      `describe('${translatedTitle} 测试', () => { \n` +
      `\tit('${functionName} function', () => { \n` +
      `\t \texpect(${functionName}()) \n` +
      `\t}) \n` +
      `})\n`

    const _targetDir = path.resolve(BASE_DIR, 'Leetcode')

    F.touch(`${_targetDir}`, `${functionName}.ts`, functionContent)
    F.touch(`${_targetDir}/tests`, `${functionName}.test.ts`, jestContent)
    log(chalk.green(`【${translatedTitle} 】方法已生成，请开始做题吧！加油！`))
  })
})

req.on('error', (error) => {
  console.error(error)
})

req.write(data1)
req.end()
