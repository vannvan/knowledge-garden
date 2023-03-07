/*
 * Description: 组合
 * Url: https://leetcode.cn/problems/combinations/
 * Tags: 回溯
 * Created: 2023-03-05 22:37:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-07 17:36:29
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function combine(n: number, k: number): number[][] {
  // Think for yourself for 5 minutes...

  let resArr: number[][] = []

  const track: number[] = []

  const backTracking = (n: number, k: number, startIndex: number): void => {
    if (track.length === k) {
      resArr.push([...track])
      return
    }
    // 不剪枝的方式
    // for (let i = startIndex; i <= n; i++) {
    //   track.push(i)
    //   backTracking(n, k, i + 1, track)
    //   // 上一步return了之后才会执行这里的pop
    //   track.pop()
    // }

    // 剪枝的方式
    for (let i = startIndex; i <= n - k + track.length + 1; i++) {
      track.push(i)
      //通过 startIndex 参数控制树枝的遍历，避免产生重复的子集
      backTracking(n, k, i + 1)
      track.pop()
    }
  }

  backTracking(n, k, 1)
  return resArr
}
export default combine
