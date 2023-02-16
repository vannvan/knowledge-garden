/*
 * Description:  hash表
 * Created: 2023-02-16 11:52:57
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-16 14:39:17
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
      const position = this.loseloseHashCode(key)
      this.table[position] = new ValuePair(key, value)
      return true
    }
    return false
  }

  get(key) {
    if (!key) return undefined
    const valuePair = this.table[this.hashCode(key)]
    return valuePair == null ? undefined : valuePair.value
  }

  remove(key) {
    if (!key) return undefined
    const hashCode = this.hashCode(key)
    if (hashCode != null) {
      delete this.table[hashCode]
      return true
    }
    return false
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

ht.put(2, 2)
ht.put('hello', 'hello-1')
ht.put('world', 'world-1')

ht.remove('world')

console.log('get', ht.get('hello'))

console.log('get', ht.get('world'))
