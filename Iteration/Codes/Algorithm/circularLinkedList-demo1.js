/**
 * 循环链表
 */

class Node {
  constructor(data, next) {
    this.data = data
    this.next = next
  }
}

class CircularLinkedList {
  constructor() {
    this.head = null
    this.count = 0
  }

  add(data) {
    let node = new Node(data)
    if (this.head === null) {
      this.head = node
    } else {
      let current = this.getElementAt(this.count - 1)
      current.next = node
    }
    // 关键，首位相接才是循环
    node.next = this.head
    this.count++
  }

  insert(data, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(data)
      let current = this.head
      if (index === 0) {
        if (this.head == null) {
          // if no node  in list
          this.head = node
          node.next = this.head
        } else {
          node.next = current
          current = this.getElementAt(this.size() - 1)
          // update last element
          this.head = node
          current.next = this.head
        }
      } else {
        const previous = this.getElementAt(index - 1)
        node.next = previous.next
        previous.next = node
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
        if (this.size() === 1) {
          this.head = undefined
        } else {
          const removed = this.head
          current = this.getElementAt(this.size() - 1)
          this.head = this.head.next
          current.next = this.head
          current = removed
        }
      } else {
        // no need to update last element for circular list
        const previous = this.getElementAt(index - 1)
        current = previous.next
        previous.next = current.next
      }
      this.count--
      return current.element
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
}

const link = new CircularLinkedList()
link.add(1)
link.add(3)
link.add(2)

link.removeAt(2)

console.dir(link)
