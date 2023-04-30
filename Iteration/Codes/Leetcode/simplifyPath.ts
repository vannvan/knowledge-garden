/*
 * Description: 71：简化路径
 * Url: https://leetcode.cn/problems/simplify-path/
 * Tags: 栈  字符串
 * Created: 2023-04-30 22:01:18
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-30 22:21:45
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function simplifyPath(path: string): string {
  // Think for yourself for 5 minutes...
  // q1. 首先开头一定是要有一个反斜杠的，结尾不能有反斜杠，对于只有 / 除外
  // q2. 根据 / 分割字符串，可以分割出以下几种情况
  // a. 如果存在连续 // 那么就会分割出空字符串
  // b. 一个点 .
  // c. 两个点 ..
  // d. 合法的目录名称
  // 对于a b 无需处理，对于c 我们需要往前切一层目录，因此需要栈维护前面的目录，弹出一项，对于d就正常入栈

  const pathArray = path.split('/')

  const stack = []

  for (const [_, name] of pathArray.entries()) {
    // if (name === '..') {
    //   stack.length && stack.pop()
    // } else if (name.length && name != '.') {
    //   stack.push(name)
    // }

    if (name.length && name != '.') {
      if (name === '..') {
        stack.length && stack.pop()
      } else {
        stack.push(name)
      }
    }
  }

  return '/' + stack.join('/')
}
export default simplifyPath
