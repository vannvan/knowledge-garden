/*
 * Description: 406：根据身高重建队列
 * Url: https://leetcode.cn/problems/queue-reconstruction-by-height/
 * Tags: 贪心  树状数组  线段树  数组  排序
 * Created: 2023-03-11 16:44:16
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 17:03:39
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function reconstructQueue(people: number[][]): number[][] {
  // Think for yourself for 5 minutes...

  // 优先先按身高先排个序
  people.sort((a, b) => {
    // 如果身高相同，就按后面的排序
    if (a[0] === b[0]) return a[1] - b[1]
    return b[0] - a[0]
  })

  console.log('people', people)
  let queue: number[][] = []

  for (let i = 0; i < people.length; i++) {
    queue.splice(people[i][1], 0, people[i])
  }

  console.log('queue', queue)

  return queue
}
export default reconstructQueue
