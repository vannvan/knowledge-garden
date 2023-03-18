/*
 * Description: leetcode做题分类
 * Created: 2023-03-10 16:55:38
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 17:20:35
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
const F = require('./utils/file')
const Leetcode = require('./utils/leetcode')
const log = console.log
const chalk = require('chalk')
const { uniqBy, uniq } = require('lodash')
const CONFIG = require('./config')

class Analyse {
  constructor() {
    this.LC = new Leetcode()
  }

  /**
   * 执行分析程序
   * url, localFileName 只从生成lc题目的之后执行具体的url操作，否则本地文件名称无法传入
   * @param {*} url lc链接
   */
  async do(url, localFileName) {
    if (url && /leetcode/.test(url) && localFileName) {
      log(chalk.cyan(`开始获取${url}的题目信息...`))
      const { data } = await this.LC.getQuestionInfo(url)
      const oldInfo = F.read(`${CONFIG.LC_TOPIC_DIR}/analyse.json`)

      if (oldInfo) {
        const _oldJSON = JSON.parse(oldInfo)

        _oldJSON.topics.push(this.genTopicInfo({ ...data.question, localFileName }))

        _oldJSON.tags = _oldJSON.tags.concat([...this.genTagsInfo(data.question)])

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
    const title = '# 做题分析 \n ---- \n [leetcode做题分析](https://leetcode.cn/progress/) \n'

    const tagTitle = '## 标签列表 \n'

    const topicInfoItems = '----  \n ## 题目列表 \n '

    const tableTitleOption = {
      num: '序号',
      id: '题目ID',
      cnTitle: '题目',
      functionName: '方法名称',
      difficulty: '难度',
      tag: '标签',
    }

    const topicRow =
      '|' + new Array(Object.keys(tableTitleOption).length).fill('----').join('|') + '|\n'
    const topicTableHead = '|' + Object.values(tableTitleOption).join('|') + '|\n' + topicRow

    // 生成标签列表
    const tagInfoItems =
      configJson.tags
        .sort((a, b) => a.slug - b.slug) // 可以根据首字母排序
        .map((item) => `[${item.cnName}](${CONFIG.LC_TAG_BASE_URL}/${item.slug})`)
        .join('\t') + '\n \n'

    // 生成题目列表
    let topicTableBody =
      uniqBy(configJson.topics, 'id')
        .sort((a, b) => a.functionName - b.functionContent) // 可以根据首字母排序
        .map((item, index) => this.genTopicItem(index, item))
        .join('\n') + '\n' // 最后要换行cls

    const markdownContent =
      title + tagTitle + tagInfoItems + topicInfoItems + topicTableHead + topicTableBody
    // 生成md文件
    F.touch(CONFIG.LC_TOPIC_DIR, 'README.md', markdownContent)

    // 生成json文件
    F.touch(CONFIG.LC_TOPIC_DIR, 'analyse.json', JSON.stringify(configJson))

    log(chalk.green('-------记录已更新------'))
    log(chalk.cyan(`目前是第${configJson.topicInfo.length}道题`))
    log(chalk.green('-------再接再厉哦------'))
  }

  /**
   * 生成题目行
   * @param {*} index
   * @param {*} info
   * @returns
   */
  genTopicItem(index, info) {
    const itemInfo = {
      num: index,
      id: info.id,
      cnTitle: `[${info.cnName}](${CONFIG.LC_TOPIC_BASE_URL}/${info.titleSlug})`, // 指向lc连接,titleSlug才是lc连接识别的
      functionName: `[${info.functionName}](${CONFIG.GITHUB_TOPIC_BASE_URL}/${info.localFileName})`, // 指向github连接
      difficulty: `${CONFIG.LC_TOPIC_DIFFICULTY_OPTS[info.difficulty]}`,
      tags: `${info.tags.map((el) => el.cnName).join('  ')}`,
    }

    return '|' + Object.values(itemInfo).join('|') + '|'
  }
  /**
   * 根据lc返回数据生成题目信息
   * @param {*} info
   */
  genTopicInfo(info) {
    const {
      translatedTitle,
      topicTags,
      metaData,
      questionId,
      difficulty,
      titleSlug,
      localFileName,
    } = info
    const functionName = JSON.parse(metaData).name
    return {
      id: questionId,
      cnName: translatedTitle,
      functionName,
      titleSlug,
      tags: topicTags.map((el) => {
        return {
          slug: el.slug,
          cnName: el.translatedName,
        }
      }),
      localFileName,
      difficulty,
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
   * 获取文件列表
   */
  async getFileListInfo() {
    const files = await F.readDirectory(
      CONFIG.LC_TOPIC_DIR,
      (name) => !/test/.test(name) && /ts$/.test(name)
    )

    console.log(files)
  }

  /**
   * 获取本地文件地址
   * @param {*} fullpathName
   * @returns
   */
  getLocalFileName(fullpathName) {
    if (fullpathName) {
      let index = fullpathName.lastIndexOf('/')
      return fullpathName.substring(index + 1)
    } else {
      return ''
    }
  }

  /**
   * 批量任务
   */
  async batchTask() {
    // 文件列表
    const files = await F.readDirectory(
      CONFIG.LC_TOPIC_DIR,
      (name) => !/test/.test(name) && /ts$/.test(name)
    )

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
          topicInfo.tags.push({ slug: val, cnName: key })
        })
        log(chalk.green('批量任务完成'))
        this.genFile(topicInfo)
        // 生成一个有问题文件记录
        F.touch(CONFIG.LC_TOPIC_DIR, 'error.log', JSON.stringify(errorLog.join('\n')))
      }
      const functionContent = F.read(files[index])
      // console.log('functionContent', functionContent)
      const url = functionContent.match(urlReg)
      if (url && url.length) {
        log(chalk.white(`目标链接${url[0]}`))
        const { data } = await this.LC.getQuestionInfo(url[0])

        // 标签
        const topicTags = this.genTagsInfo(data.question)

        // 生成不重复的标签map
        topicTags.map((el) => {
          if (!tagInfoListMap.has(el.cnName)) {
            tagInfoListMap.set(el.cnName, el.slug)
          }
        })
        // 添加题目本地文件地址，因为本地文件名称和lc不一定完全一致
        const localFileName = this.getLocalFileName(files[index])
        topicInfo.topics.push(
          this.genTopicInfo({
            ...data.question,
            localFileName,
          })
        )
        index++
      } else {
        log(chalk.red(`${files[index]}文件注释信息有误`))
        errorLog.push(files[index])
        index++
      }
    }, CONFIG.LC_REQUEST_DURATION)
  }
}

module.exports = Analyse
