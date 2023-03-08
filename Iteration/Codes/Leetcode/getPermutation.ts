/*
 * Description: 排列序列
 * Url: https://leetcode.cn/problems/permutation-sequence/
 * Tags: 递归  数学
 * Created: 2023-03-08 14:41:37
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-08 14:55:03
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function getPermutation(n: number, k: number): string {
  // Think for yourself for 5 minutes...

  const solution: number[][] = []

  const track: number[] = []

  const used: boolean[] = []

  const backTrack = (n: number) => {
    if (track.length == n) {
      solution.push([...track])
      return
    }
    // 可以省去一些后面的操作
    if (solution.length > k) {
      return
    }

    for (let i = 0; i < n; i++) {
      if (used[i]) continue

      used[i] = true
      track.push(i + 1)

      backTrack(n)

      used[i] = false
      track.pop()
    }
  }

  backTrack(n)

  return solution[k - 1].join('')
}
export default getPermutation
