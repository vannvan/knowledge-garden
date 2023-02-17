/*
 * Description: hash表 线性排查处理冲突
 * Created: 2023-02-16 16:03:35
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-16 16:20:13
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

class ValuePair {
  constructor(key, value) {
    this.key = key
    this.value = value
  }

  toString() {
    return `[#${this.key}:${this.value}]`
  }
}

class HashTable {
  constructor() {
    this.table = {}
  }

  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key)
      // 没被占直接添加
      if (this.table[position] === undefined) {
        this.table[position] = new ValuePair(key, value)
      } else {
        let index = position + 1
        // 一直找到没被占的位置
        while (this.table[index] != null) {
          index++
        }
        this.table[index] = new ValuePair(key, value)
      }
      return true
    }
    return false
    //
  }

  get(key) {
    const position = this.hashCode(key)
    if (this.table[position]) {
      if (this.table[position].key === key) {
        return this.table[position].value
      } else {
        let index = position + 1
        while (this.table[index] != null && this.table[index].key !== key) {
          i++
        }
        if (this.table[index] != null && this.table[index].key === key) {
          return this.table[index].value
        }
      }
    }
    return undefined
  }

  hashCode(key) {
    return this.loseloseHashCode(key)
  }

  loseloseHashCode(key) {
    if (typeof key === 'number') {
      return key
    }

    let code = 0
    const str = this.toString(key)
    for (let i = 0; i < str.length; i++) {
      code += str.charCodeAt(i)
    }
    return code % 37 // 大概率保证不产生重复值
  }

  toString(item) {
    if (item === null) {
      return 'NULL'
    } else if (item === undefined) {
      return 'UNDEFINED'
    } else if (typeof item === 'string' || item instanceof String) {
      return `${item}`
    }
    return item.toString()
  }
}

const ht = new HashTable()
ht.put('hello', 'hello-1')
ht.put('Nathan', 'world-1')
ht.put('Sargeras', 'world-2')

console.dir(ht)

console.log('get', ht.get('hello'))

console.log('get', ht.get('Nathan'))

console.log('get', ht.get('Sargeras'))
