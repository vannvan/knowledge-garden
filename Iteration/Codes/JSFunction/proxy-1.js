/*
 * Description:
 * Created: 2023-04-26 22:29:22
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-26 22:39:02
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
let tool = {
  add: () => {
    //
  },
}

function wrap(target) {
  return new Proxy(target, {
    get(target, prop, receiver) {
      console.log('target', target, prop)
      if (!prop in target) {
        console.warn(`${prop}属性不存在哦`)
      } else {
        return Reflect.get(target, prop, receiver)
      }
    },
  })
}

tool = wrap(tool)

tool.add()
tool.inc()

// console.log(Object.getPrototypeOf(tool))
