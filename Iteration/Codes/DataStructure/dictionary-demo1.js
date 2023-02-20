/*
 * Description:  字典
 * Created: 2023-02-16 11:01:57
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-16 11:55:10
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

class Dictionary {
  constructor() {
    this.table = {}
  }

  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toString(key)
      this.table[tableKey] = new ValuePair(key, value)
      return true
    }
    return false
  }

  get(key) {
    const valuePair = this.table[this.toString(key)]
    return valuePair === null ? undefined : valuePair.value
  }

  hasKey(key) {
    return this.table[this.toString(key)] != null
  }

  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toString(key)]
      return true
    }
    return false
  }

  clear() {
    this.table = {}
  }

  size() {
    return Object.keys(this.table).length
  }

  isEmpty() {
    return this.size() === 0
  }

  keys() {
    return this.keysValues().map((valuePair) => valuePair.key)
  }

  values() {
    return this.keysValues().map((valuePair) => valuePair.value)
  }

  keysValues() {
    return Object.values(this.table)
  }

  forEach(callback) {
    const valuePairs = this.keysValues()
    for (let i = 0; i < valuePairs.length; i++) {
      const result = callback(valuePairs[i].key, valuePairs[i].value)
      if (result == false) {
        break
      }
    }
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

const d = new Dictionary()
d.set(1, 1)
d.set(2, 2)
d.set('haha', '哈哈')

console.log('keys', d.keys())
console.log('values', d.values())
console.log('get', d.get(1))
console.log('keysValues', d.keysValues())
d.forEach((key, value) => {
  console.log('key', key, 'value', value)
})
