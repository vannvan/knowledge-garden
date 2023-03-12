/*
 * Description: leetcode方法
 * Created: 2023-03-10 17:32:22
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 23:07:51
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const log = console.log
const chalk = require('chalk')
const axios = require('axios')
/**
 * lc 接口
 */
class Leetcode {
  constructor() {
    this.baseQuery =
      'query questionData($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    categoryTitle\n    boundTopicId\n    title\n    titleSlug\n     translatedTitle\n    translatedContent\n    isPaidOnly\n    difficulty\n    likes\n    dislikes\n    isLiked\n    similarQuestions\n      topicTags {\n      name\n      slug\n      translatedName\n      __typename\n    }\n    codeSnippets {\n      lang\n      langSlug\n      code\n      __typename\n    }\n    stats\n     solution {\n      id\n      canSeeDetail\n      __typename\n    }\n    status\n    sampleTestCase\n  jsonExampleTestcases\n  metaData\n       }\n}'
  }

  /**
   * 获取lc题目信息
   * @param {*} leetcodeQuestionUrl
   * @returns
   */
  async getQuestionInfo(leetcodeQuestionUrl) {
    const urlArr = leetcodeQuestionUrl.split('/').filter(Boolean)

    const titleSlug = urlArr[urlArr.length - 1]
    if (!titleSlug) {
      log(chalk.red('链接无效'))
      process.exit(0)
    }

    return new Promise((resolve) => {
      const data = JSON.stringify({
        operationName: 'questionData',
        variables: {
          titleSlug: titleSlug,
        },
        query: this.baseQuery,
      })
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://leetcode.cn/graphql/',
        headers: {
          'Content-Type': 'application/json',
          Cookie: 'csrftoken=4eiKvbU2d2dVGq1VW9GQ3gI04Z53l5wv7KGFvhAHP62PQRg9NgpJIyIcr96t6Swq',
        },
        data: data,
      }

      axios(config)
        .then(function (response) {
          // console.log(JSON.stringify(response.data))
          resolve(response.data)
        })
        .catch(function (error) {
          console.log(error)
          log(chalk.red('leetcode接口调用失败', error))
          process.exit(0)
        })
    })
  }
}

module.exports = Leetcode
