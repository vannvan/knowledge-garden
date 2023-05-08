/*
 * Description:
 * Created: 2023-05-08 22:52:49
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-08 22:57:12
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function MPromise(fn) {
  let state = 'pending'
  let value = null
  let tasks = []
  this.then = function (onFulfilled) {
    if (state === 'pending') {
      tasks.push(onFulfilled)
    }
    onFulfilled(value)
    return this // 返回当前状态
  }
  function resolve(newValue) {
    value = newValue
    state = 'fulfilled'
    setTimeout(() => {
      tasks.forEach((task) => {
        task(value)
      })
    }, 0)
  }
  fn(resolve)
}

function getId() {
  return new MPromise((resolve) => {
    resolve(123)
  })
}

getId().then((res) => {
  console.log(res)
})
