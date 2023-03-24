/*
 * Description: 67：二进制求和
 * Url: https://leetcode.cn/problems/add-binary/
 * Tags: 位运算  数学  字符串  模拟
 * Created: 2023-03-24 21:54:25
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-24 22:27:59
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

// 此方法不能应对parseInt在将很大的二进制转十进制时，溢出的情况
function addBinary1(a: string, b: string): string {
  // Think for yourself for 5 minutes...

  // x保存结果，y保存进位,其实也可以直接用ab
  let x = parseInt(a, 2)
  let y = parseInt(b, 2)
  console.log('x', x, 'y', y)
  while (y) {
    let carry = x & y
    console.log('carry', carry)
    x = x ^ y
    console.log('x', x)
    y = carry << 1
    console.log('y', y)
  }

  return x.toString(2)
}

var addBinary = function (a, b) {
  let [num1, num2] = a.length > b.length ? [a, b] : [b, a]
  let result = ''
  let carry = 0
  for (let i = 0; i < num1.length; i++) {
    let empty1 = num1[num1.length - i - 1]
    let empty2 = num2[num2.length - i - 1] || 0
    if (+empty1 + +empty2 === 2) {
      result = carry + result
      carry = 1
    } else if (+empty1 + +empty2 === 1) {
      if (carry === 1) {
        result = '0' + result
      } else {
        result = '1' + result
      }
    } else if (+empty1 + +empty2 === 0) {
      result = carry + result
      carry = 0
    }
  }

  return carry ? carry + result : result
}

export default addBinary
