/*
 * Description: 22：括号生成
 * Url: https://leetcode.cn/problems/generate-parentheses/
 * Tags: 字符串  动态规划  回溯
 * Created: 2023-03-08 21:15:15
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-25 22:40:08
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function generateParenthesis1(n: number): string[] {
  // Think for yourself for 5 minutes...

  // q1. 所有的有效的括号
  // q2. 如果左括号不大于n，我们可以放一个左括号，如果右括号数量小于左括号数量，可以放一个右括号

  if (n == 1) return ['()']

  const res: string[] = []

  const track: string[] = []

  const backTrack = (open: number, close: number) => {
    // console.log('track', track)
    if (track.length == n * 2) {
      res.push([...track].join(''))
    }

    if (open < n) {
      track.push('(')
      backTrack(open + 1, close)
      track.pop()
    }

    if (close < open) {
      track.push(')')
      backTrack(open, close + 1)
      track.pop()
    }
  }

  backTrack(0, 0)

  // console.log('res', res)

  return res
}

function generateParenthesis(n: number): string[] {
  const ans: string[] = []

  const path: string[] = []

  const dfs = (i: number, open: number) => {
    if (i == n * 2) {
      ans.push(path.join(''))
      return
    }

    if (open < n) {
      path[i] = '('
      dfs(i + 1, open + 1)
    }
    if (i - open < open) {
      path[i] = ')'
      dfs(i + 1, open)
    }
  }

  dfs(0, 0)

  return ans
}

export default generateParenthesis
