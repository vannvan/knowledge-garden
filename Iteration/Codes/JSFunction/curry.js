/*
 * Description: 柯里化
 * Created: 2023-05-16 20:46:54
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-16 21:35:01
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const curry = (fn) => {
  let params = []
  const next = (...args) => {
    console.log('args', args)
    console.log('next', next)
    params = [...params, ...args]
    if (params.length < fn.length) {
      return next
    } else {
      // return fn.apply(fn, params)
      return fn(...params)
    }
  }
  return next
}

const sum = (a, b, c, d) => {
  return a + b + c + d
}

const fn = curry(sum)

const res = fn(1)(2)(3)(4)

console.log(res)
