/*
 * Description: leetcode做题分类
 * Created: 2023-03-10 16:55:38
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-10 23:34:11
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
const path = require('path')
const F = require('./utils/file')
const Leetcode = require('./utils/leetcode')
const log = console.log
const chalk = require('chalk')
const { uniqBy } = require('lodash')

const difficultyOpts = {
  Easy: '简单',
  Medium: '中等',
  Hard: '困难',
}

// 调接口间隔
const DURATION = 500

// lc做题目录
const targetDir = path.resolve('./Iteration/Codes/Leetcode')

// leetcode 标签链接
const leetcodeTagBaseUrl = 'https://leetcode.cn/tag'

const leetcodeTopicBaseUrl = 'https://leetcode.cn/problems'

// github 题目代码链接
const githubTopicBaseUrl =
  'https://github.com/vannvan/archives/blob/master/Iteration/Codes/Leetcode'

class Analyse {
  constructor() {
    this.LC = new Leetcode()
  }

  async do(url) {
    if (url) {
      log(chalk.cyan(`开始获取${url}的题目信息...`))
      const { data } = await this.LC.getQuestionInfo(url)
      const oldInfo = F.read(`${targetDir}/analyse.json`)

      if (oldInfo) {
        const _oldJSON = JSON.parse(oldInfo)

        _oldJSON.topics.push(this.genTopicInfo(data.question))

        const newTags = this.genTagsInfo(data.question)

        _oldJSON.tags = _oldJSON.tags.concat(newTags)
        const newLogs = {
          tags: uniqBy(_oldJSON.tags, 'slug'),
          topics: uniqBy(_oldJSON.topics, 'id'),
        }

        this.genFile(newLogs)
      } else {
        log(chalk.red('旧纪录文件获取失败,开始批量'))
        this.batchTask()
      }
    } else {
      log(chalk.green('开始批量生成任务.....'))
      this.batchTask()
    }
  }

  /**
   * 生成文件 json和md文件
   * @param {*} configJson
   */
  genFile(configJson) {
    F.touch(targetDir, 'analyse.json', JSON.stringify(configJson))

    const title = '# 做题分析 \n ---- \n'

    let tagInfoItems = '## 标签列表 \n'

    let topicInfoItems = '----  \n ## 题目列表 \n '

    let topicTableHead = `|序号|题目ID|题目|方法名称|难度|标签|\n|----|----|----|----|----|----|\n`
    // 生成标签列表
    tagInfoItems +=
      configJson.tags
        .map((item) => `[${item.cnName}](${leetcodeTagBaseUrl}/${item.slug})`)
        .join('\t') + '\n \n'

    // 生成题目列表
    let topicTableBody =
      configJson.topics
        .map(
          (item, index) =>
            `|${index}|${item.id}|[${item.cnName}](${leetcodeTopicBaseUrl}/${
              item.functionName
            }) | [${item.functionName}](${githubTopicBaseUrl}/${item.functionName}.ts)|${
              difficultyOpts[item.difficulty]
            } | ${item.tags.map((el) => el.cnName).join('  ')} |`
        )
        .join('\n') + '\n' // 最后要换行

    const markdownContent = title + tagInfoItems + topicInfoItems + topicTableHead + topicTableBody

    // 生成md文件
    F.touch(targetDir, 'README.md', markdownContent)

    log(chalk.green('-------记录已更新------'))
  }

  /**
   * 根据lc返回数据生成题目信息
   * @param {*} info
   */
  genTopicInfo(info) {
    const { translatedTitle, topicTags, metaData, questionId, difficulty } = info
    const functionName = JSON.parse(metaData).name
    return {
      id: questionId,
      cnName: translatedTitle,
      functionName: functionName,
      tags: topicTags.map((el) => {
        return {
          slug: el.slug,
          cnName: el.translatedName,
        }
      }),
      difficulty: difficulty,
    }
  }

  /**
   * 根据lc返回数据生成标签信息
   * @param {*} info
   */
  genTagsInfo(info) {
    const { topicTags } = info
    return topicTags.map((el) => {
      return {
        slug: el.slug,
        cnName: el.translatedName,
      }
    })
  }
  /**
   * 批量任务
   */
  async batchTask() {
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
    // 有问题的文件
    const errorLog = []

    let timer = setInterval(async () => {
      if (index == MAX) {
        clearInterval(timer)
        // 添加标签
        tagInfoListMap.forEach((val, key) => {
          // tagInfoItems += `- [${key}](${leetcodeTagBaseUrl}${val}/problemset) \n`
          topicInfo.tags.push({ slug: val, cnName: key })
        })
        log(chalk.green('批量任务完成'))
        this.genFile(topicInfo)
        // 生成一个有问题文件记录
        F.touch(targetDir, 'error.log', JSON.stringify(errorLog.join('\n')))
      }
      const functionContent = F.read(files[index])
      // console.log('functionContent', functionContent)
      const url = functionContent.match(urlReg)
      if (url && url.length) {
        log(chalk.white(`目标链接${url[0]}`))
        const { data } = await this.LC.getQuestionInfo(url[0])

        const topicTags = this.genTagsInfo(data.question)

        // 生成不重复的标签map
        topicTags.map((el) => {
          if (!tagInfoListMap.has(el.cnName)) {
            tagInfoListMap.set(el.cnName, el.slug)
          }
        })

        topicInfo.topics.push(this.genTopicInfo(data.question))
        index++
      } else {
        log(chalk.red(`${files[index]}文件注释信息有误`))
        errorLog.push(files[index])
        index++
      }
    }, DURATION)
  }
}

module.exports = Analyse
