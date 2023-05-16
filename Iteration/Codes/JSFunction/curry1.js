/*
 * Description: 柯里化
 * Created: 2023-05-16 21:13:47
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-16 21:36:37
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const curry = (func) => {
  let params = []
  const next = (...args) => {
    if (args.length == 0) {
      // return func.apply(func, params)
      return func(...params)
    } else {
      params.push(...args)
      return next
    }
  }
  return next
}

let add = function (...args) {
  return args.reduce(function (prev, curr) {
    return prev + curr
  }, 0)
}

const sum = curry(add)

sum(1)(2)(2)
sum(4)
console.log(sum())
