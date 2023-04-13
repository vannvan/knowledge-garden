/*
 * Description: 621：任务调度器
 * Url: https://leetcode.cn/problems/task-scheduler/
 * Tags: 贪心  数组  哈希表  计数  排序  堆（优先队列）
 * Created: 2023-04-13 21:29:19
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-13 21:42:31
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function leastInterval(tasks: string[], n: number): number {
  // Think for yourself for 5 minutes...
  // q1. 两个 相同种类 的任务之间必须有长度为整数 n 的冷却时间 怎么理解
  // AB AB 就是两个相同种类的任务 A A也是两个相同种类的任务
  // q2. 因此最大耗时时间与出现次数最多的字符有关
  // 因此本质上是考虑将出现次数最大的任务安排掉，其他任务插入到其中

  const counts = Array(26).fill(0)

  // 1 对每个字符计数
  for (const c of tasks) {
    counts[c.charCodeAt(0) - 'A'.charCodeAt(0)]++
  }

  // 2 找到出现次数最多的字符
  let max = 0
  for (let i = 0; i < 26; i++) {
    max = Math.max(max, counts[i])
  }
  // 3 共有total个任务为max的种类
  let total = 0
  for (let i = 0; i < 26; i++) {
    total += max == counts[i] ? 1 : 0
  }

  // 当任务总数不超过(n + 1) * (max - 1) + total时，总能将其他任务插入进去
  return Math.max(tasks.length, (n + 1) * (max - 1) + total)
}
export default leastInterval
