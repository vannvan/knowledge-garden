/*
 * Description: 1277：形成三的最大倍数
 * Url: https://leetcode.cn/problems/largest-multiple-of-three/
 * Tags: 贪心  数组  动态规划
 * Created: 2023-03-16 20:12:18
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-16 21:22:53
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 不对 [1, 1, 1, 2] 不通过
 * @param digits
 * @returns
 */
function largestMultipleOfThree1(digits: number[]): string {
  // Think for yourself for 5 minutes...
  // q1. 3的最大倍数 sum%3==0 且最大
  // q2. 先尝试用最多的数组合
  // q3. 找出能够构成3的倍数的最大数字子集， 3的倍数必然满足 每一位数相加也是3的倍数
  digits.sort((a, b) => b - a) // 从大到小排序
  const maxNum: number = Number(digits.join(''))

  if (maxNum % 3 === 0) {
    return String(maxNum)
  }

  let right: number = digits.length - 1
  let left: number = 0

  const sum = (start: number, end: number) => {
    const arr = end > start ? digits.slice(start, end) : digits.slice(0)
    return arr.reduce((prev, curr) => prev + curr)
  }
  let zeroCount: number = 0
  while (right >= 0) {
    if (digits[right] == 0) {
      zeroCount++
    }
    if (sum(left, right) % 3 == 0) {
      return digits.slice(left, right).join('') + Array(zeroCount).fill(0)
    } else {
      right--
    }
  }
  return ''
}

function largestMultipleOfThree(digits: number[]): string {
  // 以上思路延续，while 右指针可能经过了之前没被算进去但后面可能为结果服务的“小数字”

  // 将原数组划分为取模后 0 1 2的三组
  // 若sum模为1 弹出模为1的最小值或两个模为2的最小值
  // 若sum模为2 弹出模为2的最小值或两个模为1的最小值

  const sum = digits.reduce((pre, num) => pre + num, 0)
  if (sum === 0) return '0'
  if (sum % 3 === 0) return digits.sort((a, b) => b - a).join('')

  const temp: number[][] = digits.reduce(
    (pre: any, num) => {
      pre[num % 3].push(num)
      return pre
    },
    [[], [], []]
  )

  const getRes = () => {
    let str = temp
      .flat()
      .sort((a, b) => b - a)
      .join('')

    if (str) {
      // 不能用parseInt去前面的0
      // return String(parseInt(str))
      let i = 0
      while (i < str.length - 1 && str[i] == '0') i++
      return str.substring(i, str.length)
      //
    } else {
      return ''
    }
  }

  if (sum % 3 === 1) {
    // 存在模为1的数可以弹出
    if (temp[1].length > 0) {
      temp[1].sort((a, b) => b - a)
      temp[1].pop()
      return getRes()
    } else if (temp[2].length > 0) {
      temp[2].sort((a, b) => b - a)
      temp[2].pop()
      temp[2].pop()
      return getRes()
    }
  } else {
    // 存在模为2的数可以弹出
    if (temp[2].length > 0) {
      temp[2].sort((a, b) => b - a)
      temp[2].pop()
      return getRes()
    } else if (temp[1].length > 0) {
      temp[1].pop()
      temp[1].pop()
      return getRes()
    }
  }

  return ''
}

export default largestMultipleOfThree
