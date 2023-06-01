/*
 * Description:
 * Created: 2023-06-01 18:51:16
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-06-01 19:25:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const obj = {
  a: {
    a1: 1,
  },
  b: 2,
  c: () => {
    console.log('hello')
  },
  d: new Map(),
  e: [1, 2, 3],
  f: new Set(),
}

const deepClone = (obj) => {
  const map = new Map()

  const clone = (source) => {
    if (map.has(source)) return map.get(source)
    const type = Object.prototype.toString.call(source).replace(/\[object (\w+)\]/, '$1')
    const strategy = {
      ObjectOrArray() {
        const result = new source.constructor()
        map.set(source, result)
        for (const key in source) {
          result[key] = clone(source[key])
        }
        return result
      },
      Map() {
        const newMap = new Map()
        source.forEach((v, k) => {
          newMap.set(clone(k), clone(v))
        })
        return newMap
      },
      Set() {
        const newSet = new Set()
        source.forEach((item) => {
          newSet.add(clone(item))
        })
        return newSet
      },
    }

    if (['Array', 'Object'].includes(type)) {
      return strategy.ObjectOrArray()
    } else {
      return strategy[type] ? strategy[type]() : source
    }
  }

  return clone(obj)
}

const newObj = deepClone(obj)

obj.a.a1 = 2
// console.dir(obj)

// console.log(newObj)

// 比如这里obj类型是未知的
function fn(obj) {
  const newObj = obj.constructor()
  console.log(newObj)
}

fn([2])
fn({ a: 1 })
