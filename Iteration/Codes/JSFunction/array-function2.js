/*
 * Description:
 * Created: 2023-05-29 16:55:32
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-29 16:58:38
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
Array.prototype.mmap = function (callback, thisArg) {
  var T, A

  if (this == null) {
    throw new TypeError('this is null or not defined')
  }

  var O = Object(this)

  var len = O.length >>> 0

  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function')
  }

  if (arguments.length > 1) {
    T = thisArg
  }

  A = new Array(len)

  var k = 0

  while (k < len) {
    var kValue, mappedValue

    if (k in O) {
      kValue = O[k]

      mappedValue = callback.call(T, kValue, k, O)

      A[k] = mappedValue
    }
    k++
  }

  return A
}
;[1, 2, 3].mmap((item) => {
  console.log(item)
})
