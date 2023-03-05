/*
 * Description: break和continue的区别
 * Created: 2023-03-05 17:57:34
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-05 18:26:03
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 输出 1 2 3
 * 死循环
 */
const continueFunc = () => {
  let count = 0
  while (count <= 5) {
    if (count == 3) {
      // 此时终止了当次循环，直接进入下次循环，会执行后面的代码，下次也是3，因此就死循环了
      continue
    }
    count++
    console.log('count is:', count)
  }
}

/**
 * 输出 0 1 2
 * 跳过遇到3时的迭代，后面的条件永远都是3了
 * 死循环
 */
const continueFunc1 = () => {
  let count = 0
  while (count <= 5) {
    if (count == 3) {
      // 此时终止了当次循环，直接进入下次循环，会执行后面的代码，下次也是3，因此就死循环了
      continue
    }
    console.log('count is:', count)
    count++
  }
}

/**
 * 输出 0 1 2 4 5 6 7 8 9 // “跳过”迭代，遇到3时不执行后面的代码
 */
const continueFunc2 = () => {
  for (let i = 0; i < 10; i++) {
    if (i === 3) {
      continue
    }
    console.log('count is:', i)
  }
}

/**
 * 输出 0 1 2 3 4 5 6 7 8 9 // 不影响
 */
const continueFunc3 = () => {
  for (let i = 0; i < 10; i++) {
    console.log('count is:', i)
    if (i === 3) {
      continue
    }
  }
}

/**
 * 输出 0 1 2 跳出循环
 */
const breakFunc = () => {
  let count = 0
  while (count < 5) {
    if (count == 3) {
      // 此时跳出整个循环，会执行后面的代码，但不能进行下次迭代
      break
    }
    console.log('count is:', count)
    count++
  }
}

/**
 * 输出 1 2 3 跳出循环
 */
const breakFunc1 = () => {
  let count = 0
  while (count < 5) {
    if (count == 3) {
      // 此时跳出整个循环，会执行后面的代码，但不能进行下次迭代
      break
    }
    count++
    console.log('count is:', count)
  }
}

/**
 * 输出 0 1 2 跳出循环
 */
const breakFunc2 = () => {
  for (let i = 0; i < 10; i++) {
    if (i === 3) {
      break
    }
    console.log('count is:', i)
  }
}

/**
 * 输出 0 1 2 3 跳出循环
 */
const breakFunc3 = () => {
  for (let i = 0; i < 10; i++) {
    console.log('count is:', i)
    if (i === 3) {
      break
    }
  }
}

continueFunc3()

// breakFunc3()
