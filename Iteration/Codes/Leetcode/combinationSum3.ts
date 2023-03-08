/*
 * Description: 216：组合总和 III
 * Url: https://leetcode.cn/problems/combination-sum-iii/
 * Tags: 数组  回溯
 * Created: 2023-03-08 22:39:45
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-08 22:57:24
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function combinationSum3(k: number, n: number): number[][] {
  // Think for yourself for 5 minutes...

  const res: number[][] = []

  const track: number[] = []

  let sumNum: number = 0

  const backTrack = (k: number, startIndex: number) => {
    if (track.length == k && sumNum == n) {
      res.push([...track])
    }

    if (sumNum > n) {
      return
    }

    // 剪枝，
    for (let i = startIndex; i < (n > 9 ? 9 : n) && sumNum + i + 1 <= n; i++) {
      track.push(i + 1)
      sumNum += i + 1

      backTrack(k, i + 1)

      track.pop()
      sumNum -= i + 1
    }
  }

  backTrack(k, 0)

  return res
}
export default combinationSum3
