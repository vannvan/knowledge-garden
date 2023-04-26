/*
 * Description:
 * Created: 2023-04-26 21:35:16
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-26 21:35:23
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
function reactive(target = {}) {
  // 不是对象、数组直接返回
  if (typeof target !== 'object' || target == null) {
    return target
  }

  const proxyConfig = {
    get(target, key, receiver) {
      const ownKeys = Reflect.ownKeys(target)
      if (ownKeys.includes(key)) {
        console.log('get', key)
      }
      const result = Reflect.get(target, key, receiver)
      /* 深度监听修改1
        return result
        
      */
      /*
        性能提升：在get时去递归，去深度监听
        而 defineProperty 是开始时就递归完成
      */
      return reactive(result)
    },
    set(target, key, val, receiver) {
      if (val === target[key]) {
        return true
      }

      /* 可监听到新增的key */
      const ownKeys = Reflect.ownKeys(target)
      if (ownKeys.includes(key)) {
        // 已有的可以
      } else {
        // 新增的key
        console.log('新增的key')
      }

      const result = Reflect.set(target, key, val, receiver)
      console.log('set', key, val)
      return result
    },
    deleteProperty(target, key) {
      const result = Relect.deleteProperty(target, key)
      console.log('delete property', key)
      return result
    },
  }

  // 生成代理对象
  const observed = new Proxy(target, proxyConfig)
  return observed
}

// 测试数据
const data = {
  name: 'zwx',
  age: '25',
  info: {
    city: 'beijing',
    a: {
      b: {
        c: 1,
      },
    },
  },
}

//
let newdata = reactive(data)
newdata.info.city // get info 不是 get city
newdata.info.a // b 和之后还没加入响应式

newdata.info.a.b.zzz = 88
