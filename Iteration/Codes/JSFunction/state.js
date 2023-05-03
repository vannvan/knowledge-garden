/*
 * Description:
 * Created: 2023-05-03 11:27:11
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-03 18:12:56
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
function findStr(str) {
  let state = start
  for (const c of str) {
    state = state(c)
  }
  return state === end
}
function start(c) {
  if (c === 'a') {
    return findA
  } else return start
}
function end(c) {
  return end
}
function findA(c) {
  if (c === 'b') {
    return findB
  } else return start(c)
}
function findA2(c) {
  if (c === 'b') {
    return findB2
  } else return start(c)
}
function findA3(c) {
  if (c === 'b') {
    return findB3
  } else return start(c)
}
function findB(c) {
  if (c === 'a') {
    return findA2
  } else return start(c)
}
function findB2(c) {
  if (c === 'a') {
    return findA3
  } else return start(c)
}
function findB3(c) {
  if (c === 'x') {
    return end
  } else return start(c)
}
console.log(findStr('aaabxababx'))

let fn1 = () => {
  console.log('fn1')
  throw '报个错'
}

let fn2 = () => {
  fn1()
  console.log('gn2')
}

let fn = () => {
  fn2()
  console.trace()
}

fn()
