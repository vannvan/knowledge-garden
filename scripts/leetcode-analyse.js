/*
 * Description: leetcode做题分类
 * Created: 2023-03-10 16:55:38
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-10 18:48:01
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
const path = require('path')
const fs = require('fs')
const F = require('./utils/file')
const Leetcode = require('./utils/leetcode')

const targetDir = path.resolve('./Iteration/Codes/Leetcode')

;(async () => {
  const files = await F.readDirectory(targetDir, (name) => !/test/.test(name) && /ts$/.test(name))

  // const content = F.read(
  //   '/Users/vannvan/Documents/vannvan@github/archives/Iteration/Codes/Leetcode/repeatedSubstringPattern.ts'
  // )
  const LC = new Leetcode()

  const urlReg = /(?<=Url:\s)(\S*)/

  // const url = content.match(urlReg)

  // console.dir({
  //   functionName,
  //   questionId,
  //   translatedTitle,
  //   topicTags,
  //   difficulty,
  // })

  let index = 0
  const MAX = files.length - 1
  // const MAX = 5

  const title = '# 题目 \n ---- \n'
  // 标签
  let tagInfoItems = '## 标签列表 \n '
  // 题目列表
  let topicInfoItems = '---- \n ## 题目列表 \n '
  // leetcode 标签链接
  const leetcodeTagBaseUrl = 'https://leetcode.cn/tag/'

  // github 题目代码链接
  const githubTopicBaseUrl =
    'https://github.com/vannvan/archives/blob/master/Iteration/Codes/Leetcode/'

  // 生成一个不重复的标签列表
  const tagInfoListMap = new Map()
  let timer = setInterval(async () => {
    if (index == MAX) {
      clearInterval(timer)
      tagInfoListMap.forEach((val, key) => {
        tagInfoItems += `- [${key}](${leetcodeTagBaseUrl}${val}/problemset) \n`
      })

      const markdownContent = title + tagInfoItems + topicInfoItems
      F.touch(targetDir, 'analyse.md', markdownContent)
    }
    const functionContent = F.read(files[index])
    // console.log('functionContent', functionContent)
    const url = functionContent.match(urlReg)
    if (url && url.length) {
      console.log('目标链接', url[0])
      let { data } = await LC.getQuestionInfo(url[0])

      const { translatedTitle, topicTags, metaData, questionId, difficulty } = data.question
      const functionName = JSON.parse(metaData).name

      // 生成标签map
      topicTags.map((el) => {
        // tagInfoListSet.add(el.translatedName)
        if (!tagInfoListMap.has(el.translatedName)) {
          tagInfoListMap.set(el.translatedName, el.slug)
        }
      })

      // 生成题目列表
      topicInfoItems += `${index}. [${questionId}: ${translatedTitle}](${
        url[0]
      }) 函数名称: [${functionName}](${githubTopicBaseUrl}/${functionName}.ts) 标签: 【${topicTags
        .map((el) => el.translatedName)
        .join('  ')} 】 \n`
      index++
    } else {
      console.log(`${files[index]}文件有问题`)
      index++
    }
  }, 1000)

  // console.log('translatedTitle', translatedTitle)

  // console.log(files)
})()
