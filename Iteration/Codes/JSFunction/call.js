/*
 * Description:
 * Created: 2023-05-15 22:56:59
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-15 22:58:39
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
Function.prototype.mycall = function (context, ...args) {
  // 不传默认是全局，window
  context = context || window
  // args不传时默认是空数组，防止下面用spread操作符时报错
  args = args ? args : []
  // 把this存到context.fn，这里的this是调用的函数
  context.fn = this
  // 执行调用的函数，this指向context，参数用spread操作符扩展
  const res = context.fn(...args)
  // 删除，不污染context
  delete context.fn
  // 返回res
  return res
}

function fn(a, b, c) {
  console.log(this.name, a, b, c)
}

const obj = {
  name: 'bob',
}

fn.call(obj, 1, 2, 3)
