/*
 * Description: 脚本配置
 * Created: 2023-03-12 22:49:38
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-14 00:27:38
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
const path = require('path')
const dir = path.resolve(__dirname)

module.exports = {
  /**
   * lc题目模版,函数类型
   */
  LC_FUNCTION_TEMPLATE: path.resolve('./scripts/template/leetcodeFunction.ts'),

  /**
   * lc测试脚本模版,函数类型
   */
  LC_JEST_TEMPLATE: path.resolve('./scripts/template/tests/leetcodeFunction.test.ts'),

  /**
   * lc做题目录
   */
  LC_TOPIC_DIR: path.resolve('./Iteration/Codes/Leetcode'),
  /**
   * lc标签页面
   */
  LC_TAG_BASE_URL: 'https://leetcode.cn/tag',

  /**
   * lc 题目页面
   */
  LC_TOPIC_BASE_URL: 'https://leetcode.cn/problems',

  /**
   * github 题目代码连接
   */
  GITHUB_TOPIC_BASE_URL: 'https://github.com/vannvan/archives/blob/master/Iteration/Codes/Leetcode',
  /**
   * lc 接口调用间隔
   */
  LC_REQUEST_DURATION: 500,

  /**
   * lc 题目难度选项
   */
  LC_TOPIC_DIFFICULTY_OPTS: {
    Easy: '简单',
    Medium: '中等',
    Hard: '困难',
  },
}
