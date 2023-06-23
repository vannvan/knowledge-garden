/*
 * Description:
 * Created: 2023-06-23 21:49:14
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-06-23 21:51:04
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
function myInstanceof(target, origin) {
  const proto = target.__proto__
  if (proto) {
    if (origin.prototype === proto) {
      return true
    } else {
      return myInstanceof(proto, origin)
    }
  } else {
    return false
  }
}

const obj = { a: 1 }

const arr = [1]

console.log(myInstanceof(obj, Array))
console.log(myInstanceof(obj, Object))

console.log(myInstanceof(arr, Object))
console.log(myInstanceof(arr, Array))
