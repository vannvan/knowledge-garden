/*
 * Description: 数组的花式遍历
 * Created: 2023-04-11 20:01:10
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-11 20:19:44
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

/**
 * 正向行遍历
 */
const forwardRowDirection = (arr) => {
  console.log('正向行遍历')

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      console.log(arr[i][j]) // 注意这里
    }
  }
}
/**
 * 正向列遍历
 */
const forwardColDirection = () => {
  console.log('正向列遍历')
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      console.log(arr[j][i]) // 注意这里
    }
  }
}
/**
 * 反向行遍历 S 型
 */
const reverseRowDirectionLikeS = (arr) => {
  console.log('反向行S型遍历')
  for (let i = 0; i < arr.length; i++) {
    for (let j = arr[i].length - 1; j >= 0; j--) {
      console.log(arr[i][j]) // 注意这里
    }
  }
}

/**
 * 反向行遍历 Z 型
 * @param {*} arr
 */
const reverseRowDirectionLikeZ = (arr) => {
  console.log('反向行Z型遍历')
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = arr[i].length - 1; j >= 0; j--) {
      console.log(arr[i][j]) // 注意这里
    }
  }
}

const reverseColDirection = () => {
  for (let i = 0; i < arr.length; i++) {}
}

forwardRowDirection(arr)

forwardColDirection(arr)

reverseRowDirectionLikeZ(arr)
