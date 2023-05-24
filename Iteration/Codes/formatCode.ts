/**
 * 验证使用n天是否能满足条件
 * @returns
 */
const valid = (bloomDay: number[], n: number, m: number, k: number) => {
  // 临时变量存储已制作花的数量，对标m
  let count = 0
  // 记录已使用的花朵，对标k
  let used = 0
  for (let i = 0; i < bloomDay.length; i++) {
    // 可以计入一束
    if (bloomDay[i] <= n) {
      used++
      // 此时完成了一束花
      if (used === k) {
        count++
        used = 0
      }
    } else {
      // 当前位置不能作为一束花的一分子，需要重置
      used = 0
    }
  }

  return count >= m
}

function minDays(bloomDay: number[], m: number, k: number): number {
  // q1. b[i] 表示该位置的花在b[i]时盛开，相邻值得时时间相邻，而不是数组下标相邻
  // q2. b的长度要大于等于 m * k，否则就不足以制作完整的m束花
  // q3. 设需要的天数为n,能够满足条件即需要n>=m,模拟制作的过程需要使用一朵就计一次数，当计数==k时就能制作一束完整的花
  // q4. 返回最少的天数，即凑够 m * k之后，还可以继续尝试更小的，左边界为b中最小的数，右边界为b中最大的数

  // 注意这里，操作上采用除法可以避免大数溢出
  if (m > bloomDay.length / k) return -1

  let left = Math.min(...bloomDay)
  let right = Math.max(...bloomDay)

  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2)
    if (valid(bloomDay, mid, m, k)) {
      right = mid // [left,mid]
    } else {
      left = mid + 1 // [mid + 1,right]
    }
  }

  return left
}
