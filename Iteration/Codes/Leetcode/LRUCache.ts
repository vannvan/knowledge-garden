/*
 * Description: 146：LRU 缓存
 * Url: https://leetcode.cn/problems/lru-cache/
 * Tags: 设计  哈希表  链表  双向链表
 * Created: 2023-05-10 23:06:40
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-11 00:03:06
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
class LRUCache {
  map: Map<any, any>
  capacity: number
  constructor(capacity: number) {
    // Think for yourself for 5 minutes...
    this.map = new Map()
    this.capacity = capacity
  }

  get(key: number): number {
    if (this.map.has(key)) {
      let value = this.map.get(key)
      this.map.delete(key) // 删除后再set，相当于更新到最后一位
      this.map.set(key, value)
      return value
    } else {
      return -1
    }
  }

  put(key: number, value: number): void {
    if (this.map.has(key)) {
      this.map.delete(key)
    }
    this.map.set(key, value)
    if (this.map.size > this.capacity) {
      this.map.delete(this.map.keys().next().value)
    }
  }
}

class ListNode {
  key: number
  value: number
  next: ListNode
  prev: ListNode
  constructor(key?: number, value?: number) {
    this.key = key
    this.value = value
    this.next = null
    this.prev = null
  }
}

class LRUCacheByLink {
  capacity: number
  hash: {}
  count: number
  dummyHead: ListNode
  dummyTail: ListNode
  constructor(capacity: number) {
    this.capacity = capacity
    this.hash = {}
    this.count = 0
    this.dummyHead = new ListNode()
    this.dummyTail = new ListNode()
    this.dummyHead.next = this.dummyTail
    this.dummyTail.prev = this.dummyHead
  }

  get(key: number) {
    let node = this.hash[key]
    if (node == null) return -1
    this.moveToHead(node)
    return node.value
  }

  put(key: number, value: number) {
    let node = this.hash[key]
    if (node == null) {
      if (this.count == this.capacity) {
        this.removeLRUItem()
      }
      let newNode = new ListNode(key, value)
      this.hash[key] = newNode
      this.addToHead(newNode)
      this.count++
    } else {
      node.value = value
      this.moveToHead(node)
    }
  }

  moveToHead(node: ListNode) {
    this.removeFromList(node)
    this.addToHead(node)
  }

  removeFromList(node: ListNode) {
    let temp1 = node.prev
    let temp2 = node.next
    temp1.next = temp2
    temp2.prev = temp1
  }

  addToHead(node: ListNode) {
    node.prev = this.dummyHead
    node.next = this.dummyHead.next
    this.dummyHead.next.prev = node
    this.dummyHead.next = node
  }

  removeLRUItem() {
    let tail = this.popTail()
    delete this.hash[tail.key]
    this.count--
  }

  popTail() {
    let tail = this.dummyTail.prev
    this.removeFromList(tail)
    return tail
  }
}

export { LRUCache, LRUCacheByLink }
