/*
 * Description: 组合
 * Url: https://leetcode.cn/problems/combinations/
 * Tags: 回溯
 * Created: 2023-03-05 22:37:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-05 23:28:39
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function combine(n: number, k: number): number[][] {
  // Think for yourself for 5 minutes...

  let resArr: number[][] = []

  const backTracking = (n: number, k: number, startIndex: number, tmpArr: number[]): void => {
    if (tmpArr.length === k) {
      resArr.push(tmpArr.slice())
      return
    }
    // 不剪枝的方式
    // for (let i = startIndex; i <= n; i++) {
    //   tmpArr.push(i)
    //   backTracking(n, k, i + 1, tmpArr)
    //   // 上一步return了之后才会执行这里的pop
    //   tmpArr.pop()
    // }

    // 剪枝的方式
    for (let i = startIndex; i <= n - k + tmpArr.length + 1; i++) {
      tmpArr.push(i)
      backTracking(n, k, i + 1, tmpArr)
      tmpArr.pop()
    }
  }

  backTracking(n, k, 1, [])
  return resArr
}
export default combine
