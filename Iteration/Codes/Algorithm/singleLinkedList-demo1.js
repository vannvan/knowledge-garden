/**
 * 单链表
 */

class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

class singleLinkedList {
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

  insert(data, target) {
    const node = new Node(data)
    let current = this.head
    // 从头开始
    while (current.next) {
      if (current.data === target) {
        node.next = current.next
        current.next = node
        break
      }
      current = current.next
    }
  }

  find(data) {
    let current = this.head
    while (current) {
      if (current.data === data) {
        return current
      }
      current = current.next // 没有找到就往后移动
    }
    return null
  }

  remove(data) {
    let current = this.head
    let previous = null
    while (current) {
      if (current.data === data) {
        if (previous === null) {
          this.head = current.next
        } else {
          previous.next = current.next // 把前一个和后一个关系续上
        }
        return true
      }
      // 往后移动继续找
      previous = current
      current = current.next
    }
    return false
  }
}

const list = new singleLinkedList()
list.add(2)
list.add(4)
list.add(3)
// list.insert(5, 4)

console.dir(list, { depth: null })
