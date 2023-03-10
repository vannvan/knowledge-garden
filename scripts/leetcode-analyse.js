/*
 * Description: leetcode做题分类
 * Created: 2023-03-10 16:55:38
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-10 21:07:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
const path = require('path')
const fs = require('fs')
const F = require('./utils/file')
const Leetcode = require('./utils/leetcode')
const log = console.log
const chalk = require('chalk')

const difficultyOpts = {
  Easy: '简单',
  Medium: '中等',
  Hard: '困难',
}

const { uniqBy } = require('lodash')

const targetDir = path.resolve('./Iteration/Codes/Leetcode')

// leetcode 标签链接
const leetcodeTagBaseUrl = 'https://leetcode.cn/tag'

const leetcodeTopicBaseUrl = 'https://leetcode.cn/problems'

// github 题目代码链接
const githubTopicBaseUrl =
  'https://github.com/vannvan/archives/blob/master/Iteration/Codes/Leetcode'

const argUrl = process.argv[2]

const DURATION = 500

/**
 * 生成题目信息
 * @param {*} info
 * @returns
 */
const genTopicInfo = (info) => {
  const { translatedTitle, topicTags, metaData, questionId, difficulty } = info
  const functionName = JSON.parse(metaData).name
  return {
    id: questionId,
    cnName: translatedTitle,
    functionName: functionName,
    tags: topicTags,
    difficulty: difficulty,
  }
}

/**
 * 批量任务
 * @param {*} LC
 */
const batchTask = async (LC) => {
  // 文件列表
  const files = await F.readDirectory(targetDir, (name) => !/test/.test(name) && /ts$/.test(name))

  // 题目信息
  const topicInfo = {
    tags: [],
    topics: [],
  }

  const MAX = files.length - 1
  // const MAX = 3
  // 生成一个不重复的标签Map
  const tagInfoListMap = new Map()
  // url正则
  const urlReg = /(?<=Url:\s)(\S*)/

  // 起始位置
  let index = 0

  let timer = setInterval(async () => {
    if (index == MAX) {
      clearInterval(timer)

      // 添加标签
      tagInfoListMap.forEach((val, key) => {
        // tagInfoItems += `- [${key}](${leetcodeTagBaseUrl}${val}/problemset) \n`
        topicInfo.tags.push({ slug: val, cnName: key })
      })
      log(chalk.green('批量任务完成'))
      genFile(topicInfo)
    }
    const functionContent = F.read(files[index])
    // console.log('functionContent', functionContent)
    const url = functionContent.match(urlReg)
    if (url && url.length) {
      console.log('目标链接', url[0])
      let { data } = await LC.getQuestionInfo(url[0])

      const { translatedTitle, topicTags, metaData, questionId, difficulty } = data.question
      // const functionName = JSON.parse(metaData).name

      // 生成不重复的标签map
      topicTags.map((el) => {
        // tagInfoListSet.add(el.translatedName)
        if (!tagInfoListMap.has(el.translatedName)) {
          tagInfoListMap.set(el.translatedName, el.slug)
        }
      })

      topicInfo.topics.push(genTopicInfo(data.question))

      index++
    } else {
      console.log(`${files[index]}文件有问题`)
      index++
    }
  }, DURATION)
}

// 先生成json文件，再根据json文件生成md
const genFile = (newJSON) => {
  F.touch(targetDir, 'analyse.json', JSON.stringify(newJSON))

  const title = '# 做题分析 \n ---- \n'

  let tagInfoItems = '## 标签列表 \n'

  let topicInfoItems = '----  \n ## 题目列表 \n '

  let topicTableHead = `|序号|题目ID|题目|方法名称|难度|标签|\n|----|----|----|----|----|----|\n`
  // 生成标签列表
  tagInfoItems +=
    newJSON.tags.map((item) => `[${item.cnName}](${leetcodeTagBaseUrl}/${item.slug})`).join('\t') +
    '\n \n'

  // 生成题目列表
  let topicTableBody =
    newJSON.topics
      .map(
        (item, index) =>
          `|${index}|${item.id}|[${item.cnName}](${leetcodeTopicBaseUrl}/${item.functionName}) | [${
            item.functionName
          }](${githubTopicBaseUrl}/${item.functionName}.ts)|${
            difficultyOpts[item.difficulty]
          } | ${item.tags.map((el) => el.translatedName).join('  ')} |`
      )
      .join('\n') + '\n' // 最后要换行

  const markdownContent = title + tagInfoItems + topicInfoItems + topicTableHead + topicTableBody

  // 生成md文件
  F.touch(targetDir, 'README.md', markdownContent)
  log(chalk.green('-------记录已更新------'))
}

;(async () => {
  const LC = new Leetcode()

  // 如果指定了一个题目
  if (argUrl) {
    log(chalk.green(`开始获取${argUrl}的题目信息`))
    let { data } = await LC.getQuestionInfo(argUrl)
    const { translatedTitle, topicTags, metaData, questionId, difficulty } = data.question
    // const functionName = JSON.parse(metaData).name

    const oldInfo = F.read(`${targetDir}/analyse.json`)

    if (oldInfo) {
      const oldJSON = JSON.parse(oldInfo)

      oldJSON.topics.push(genTopicInfo(data.question))

      const newTags = topicTags.map((el) => {
        return {
          slug: el.slug,
          cnName: el.translatedName,
        }
      })

      oldJSON.tags = oldJSON.tags.concat(newTags)

      const newLogs = {
        tags: uniqBy(oldJSON.tags, 'slug'),
        topics: uniqBy(oldJSON.topics, 'id'),
      }

      genFile(newLogs)
    }
  } else {
    log(chalk.green('开始批量生成任务.....'))
    batchTask(LC)
  }
})()
