/*
 * Description: 打开转盘锁
 * Url: https://leetcode.cn/problems/open-the-lock/
 * Tags: 广度优先搜索  数组  哈希表  字符串
 * Created: 2023-03-08 20:36:37
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-08 20:55:55
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function openLock(deadends: string[], target: string): number {
  // Think for yourself for 5 minutes...

  // q1. 标记已经访问过的数字
  // q2. 绕过deads里面的数字
  // q3. 如果找到就直接返回结果

  const visited = new Set()

  const deads = new Set(deadends)

  const q: string[] = []

  let step = 0
  const initNum = '0000'

  q.push(initNum)
  visited.add(initNum)

  const toUp = (cur: string, j: number) => {
    let arr = cur.split('')
    if (arr[j] === '9') {
      arr[j] = '0'
    } else {
      arr[j] = (parseInt(arr[j]) + 1).toString()
    }

    return arr.join('')
  }

  const toDown = (cur: string, j: number) => {
    let arr = cur.split('')
    if (arr[j] === '0') {
      arr[j] = '9'
    } else {
      arr[j] = (parseInt(arr[j]) - 1).toString()
    }
    return arr.join('')
  }

  while (q.length) {
    let sz = q.length
    // 将队列中的节点向周围扩散
    for (let i = 0; i < sz; i++) {
      let cur = q.shift()

      // 如果在死亡数字里面就跳过
      if (cur && deads.has(cur)) {
        continue
      }

      if (target == cur) {
        return step
      }

      for (let j = 0; j < 4; j++) {
        let up = toUp(cur as string, j)

        if (!visited.has(up)) {
          q.push(up)
          visited.add(up)
        }

        let down = toDown(cur as string, j)

        if (!visited.has(down)) {
          q.push(down)
          visited.add(down)
        }
      }
    }

    step++
  }

  return -1
}
export default openLock
