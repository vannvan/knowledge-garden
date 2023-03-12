/*
 * Description: 605：种花问题
 * Url: https://leetcode.cn/problems/can-place-flowers/
 * Tags: 贪心  数组
 * Created: 2023-03-12 14:29:15
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 14:44:27
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

// 不对 这个思路是需要判断三个位置，没有考虑首尾空了%3还剩两个的情况
function canPlaceFlowers1(flowerbed: number[], n: number): boolean {
  // Think for yourself for 5 minutes...

  let l: number = n
  let r: number = n

  for (let i = 0; i < flowerbed.length; i++) {
    if (flowerbed[i - 1] === 0 && flowerbed[i] === 0 && flowerbed[i + 1] === 0) {
      l--
    }
  }

  for (let i = flowerbed.length - 1; i >= 0; i--) {
    if (flowerbed[i - 1] === 0 && flowerbed[i] === 0 && flowerbed[i + 1] === 0) {
      r--
    }
  }

  console.log('l', l, 'r', r)
  return l === 0 && r === 0
  // return n == 0
}

function canPlaceFlowers(flowerbed: number[], n: number): boolean {
  for (let i = 0; i < flowerbed.length; i++) {
    // i + 1 == flowerbed.length || flowerbed[i + 1] == 0 的含义是
    // 下一位是最后一位或下一位是空位
    if (flowerbed[i] == 0 && (i + 1 == flowerbed.length || flowerbed[i + 1] == 0)) {
      // 种一棵多往后挪一位
      n--
      i++
    } else if (flowerbed[i] == 1) {
      // 这个位置原来有花，往后挪一位
      i++
    }
  }

  return n <= 0
}
export default canPlaceFlowers
