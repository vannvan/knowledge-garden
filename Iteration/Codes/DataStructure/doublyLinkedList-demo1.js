/**
 * 双向链表
 */

class Node {
  constructor(data, next) {
    this.data = data
    this.next = next
  }
}

class DoublyLinkNode extends Node {
  constructor(data, next, prev) {
    super(data, next)
    this.prev = prev
  }
}

class DoublyLinkedList {
  constructor() {
    this.tail = {}
    this.head = null
    this.count = 0
  }

  add(data) {
    const node = new DoublyLinkNode(data)
    if (this.head === null) {
      this.head = node
      this.tail = node
    } else {
      // 前后项关联起来
      this.tail.next = node
      node.prev = this.tail
      this.tail = node
    }
    this.count++
  }

  insert(data, index) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(data)
      let current = this.head
      if (index === 0) {
        // 在最前面添加
        if (this.head == null) {
          // NEW
          this.head = node
          this.tail = node // NEW
        } else {
          node.next = this.head
          this.head.prev = node // NEW
          this.head = node
        }
      } else if (index === this.count) {
        // 在最后面添加
        // last item NEW
        current = this.tail
        current.next = node
        node.prev = current
        this.tail = node
      } else {
        // 在中间添加
        const previous = this.getElementAt(index - 1)
        current = previous.next
        node.next = current
        previous.next = node
        current.prev = node // NEW
        node.prev = previous // NEW
      }
      this.count++
      return true
    }
    return false
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head
      if (index === 0) {
        // 删除头部
        this.head = this.head.next
        if (this.count === 1) {
          // {2}
          this.tail = undefined
        } else {
          this.head.prev = undefined
        }
      } else if (index === this.count - 1) {
        // 删除尾部
        // last item //NEW
        current = this.tail
        this.tail = current.prev
        this.tail.next = undefined
      } else {
        // 删除中间的元素
        current = this.getElementAt(index)
        const previous = current.prev
        // link previous with current's next - skip it to remove
        previous.next = current.next
        current.next.prev = previous // NEW
      }
      this.count--
      return current.data
    }
    return undefined
  }

  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head
      for (let i = 0; i < index && node != null; i++) {
        node = node.next
      }
      return node
    }
    return undefined
  }

  toString() {
    if (this.head == null) {
      return '--'
    }
    let objString = `${this.head.data}`
    let current = this.head.next
    while (current != null) {
      objString = `${objString},${current.data}`
      current = current.next
    }
    return objString
  }
}

const link = new DoublyLinkedList()
link.add(1)
link.add(3)
link.add(2)

// link.removeAt(1)
console.dir(link)

// console.log(link.toString())
