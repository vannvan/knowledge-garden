/*
 * Description: 分离链接处理hash冲突
 * Created: 2023-02-16 14:58:35
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-16 15:40:47
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

class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
  }
  add(data) {
    let node = new Node(data)
    if (this.head === null) {
      this.head = node
    } else {
      let current = this.head
      // 从头开始捋一遍，添加到最后
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
  }

  getHead() {
    return this.head
  }
}

class HashTable {
  constructor() {
    this.table = {}
  }

  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key)
      if (this.table[position] == undefined) {
        this.table[position] = new LinkedList()
      }
      // 注意这里，前面相同key已经用Node节点占坑了，此时添加就用链表方法加
      this.table[position].add(new ValuePair(key, value))
      return true
    }
    return false
  }

  get(key) {
    const position = this.hashCode(key)
    const linkedList = this.table[position]
    // 这里其实应该更严格判断连表是否为空，先省略
    if (linkedList != null) {
      const current = linkedList.getHead()
      while (current != null) {
        if (current.data.key === key) {
          return current.data.value
        }
      }
      current = current.next
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

ht.put('Nathan', 'hello-1')
ht.put('Sargeras', 'hello-2')
ht.put('hello', 'hello-3')

// console.dir(ht)

console.log('get', ht.get('Nathan'))
console.log('get', ht.get('hello'))
