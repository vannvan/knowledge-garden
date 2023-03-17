/*
 * Description: 166：分数到小数
 * Url: https://leetcode.cn/problems/fraction-to-recurring-decimal/
 * Tags: 哈希表  数学  字符串
 * Created: 2023-03-17 17:00:05
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-17 18:12:17
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function fractionToDecimal1(numerator: number, denominator: number): string {
  // Think for yourself for 5 minutes...
  // q1. 如果是循环小数，将循环的部分放在括号内
  // q2. 考虑如果两个数相互取余为0 ，那么一定不存在循环小数，可以直接返回结果
  // q3. 怎么确定有循环
  // q4. 分母>0 如果分母为1 直接返回结果

  if (denominator === 1) return String(numerator)

  if (numerator % denominator == 0 || denominator % numerator == 0) {
    return String(numerator / denominator)
  }

  const division = String(numerator / denominator)

  if (/\./.test(division)) {
    const [first, second] = division.split('.')

    const hash = new Map()

    for (const val of second) {
      const a = hash.get(val) || 0
      hash.set(val, a + 1)
    }

    // 是不是循环小数,不对 16666666666也是循环小数
    const isCycle = () => {
      return [...new Set([...hash.values()])].length === 1
    }

    if (isCycle()) {
      return first + '.(' + [...hash.keys()].join('') + ')'
    } else {
      return division
    }
  } else {
    return division
  }
}

function fractionToDecimal2(numerator: number, denominator: number): string {
  // Think for yourself for 5 minutes...
  // q1. 如果是循环小数，将循环的部分放在括号内
  // q2. 考虑如果两个数相互取余为0 ，那么一定不存在循环小数，可以直接返回结果
  // q3. 怎么确定有循环
  // q4. 分母>0 如果分母为1 直接返回结果

  if (denominator === 1) return String(numerator)

  // if (numerator % denominator == 0 || denominator % numerator == 0) {
  //   return String(numerator / denominator)
  // }

  const division = String(numerator / denominator)

  console.log('division', division)

  if (/\./.test(division)) {
    const [first, second] = division.split('.')

    const hash = new Map()

    for (const val of second) {
      const a = hash.get(val) || 0
      hash.set(val, a + 1)
    }

    // 找出循环节
    const cycle = () => {
      // 两种循环的情况
      // 012012012 当[...new Set([...hash.values()])].length === 1 且所有数都大于1
      // 166666666 需要确定map最后的数字出现的次数是大于1的

      const q1 =
        [...new Set([...hash.values()])].length === 1 &&
        [...hash.values()].every((item) => item > 1)

      if (q1) {
        return '(' + [...hash.keys()].join('') + ')'
      }

      let index = 0

      let q2

      console.log(hash)

      hash.forEach((val, key) => {
        // 有个漏洞，精度问题会导致0.011111111111111112 这样的数字计算不到
        if (index === hash.size - 1 && val > 1) {
          console.log('最后一位重复', key)
          q2 = key
        }
        index++
      })

      if (q2) {
        return [...hash.values()].slice(0, hash.size - 1) + '(' + q2 + ')'
      }

      return second
    }

    return first + '.' + cycle()
  } else {
    return division
  }
}

function fractionToDecimal(numerator: number, denominator: number): string {
  if (numerator % denominator === 0) {
    return `${numerator / denominator}`
  }

  let res: string = ''

  const resMap = new Map()
  const resList: number[] = []
  // 如果存在负数要提前加负号
  if (numerator * denominator < 0) res += '-'

  numerator = Math.abs(numerator)
  denominator = Math.abs(denominator)
  res += Math.trunc(numerator / denominator) + '.' // 截断小数部分，先只要整数
  numerator = numerator % denominator
  // 一直把numerator取余取尽
  while (numerator !== 0) {
    resMap.set(numerator, resList.length)
    numerator *= 10

    const tmp = Math.floor(numerator / denominator)
    resList.push(tmp)
    numerator = numerator % denominator
    // 当map中存在这个余数，说明是从这个数开始循环的
    if (resMap.has(numerator)) {
      let left = resMap.get(numerator)
      return (res += `${resList.slice(0, left).join('')}(${resList.slice(left).join('')})`)
    }
  }

  return res + resList.join('')
}
export default fractionToDecimal
