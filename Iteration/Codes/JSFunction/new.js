/*
 * Description:
 * Created: 2023-05-28 12:08:04
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-28 12:15:51
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function Person(name, age) {
  this.name = name
  this.age = age
}

const _new = (...args) => {
  const [fn, ...rest] = args
  const target = Object.create(fn.prototype)
  const res = fn.apply(target, rest)
  if ((res && typeof res === 'object') || typeof res === 'function') {
    return res
  }
  return target
}

const _new2 = function () {
  const [self, ...rest] = arguments
  // const target = {}
  // target.__proto__ = self.prototype
  const target = Object.create(self.prototype)
  const res = self.apply(target, rest)
  if ((res && typeof res === 'object') || typeof res === 'function') {
    return res
  }
  return target
}

const person = _new2(Person, 'vannvan', 9)

console.log(person)
