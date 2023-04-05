/*
 * Description: 141：环形链表
 * Url: https://leetcode.cn/problems/linked-list-cycle/
 * Tags: 哈希表  链表  双指针
 * Created: 2023-04-05 17:46:49
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-05 18:08:32
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

/**
 * 快慢指针
 * @param head
 * @returns
 */
function hasCycle1(head: ListNode | null): boolean {
  // Think for yourself for 5 minutes...
  let slow = head
  let fast = head

  // fast每次前进两步，slow每次前进一步
  while (fast !== null && fast.next != null) {
    slow = slow.next
    fast = fast.next.next
    // 如果两个指针相遇，说明有环
    if (slow === fast) {
      return true
    }
  }
  return false
}

/**
 * hash法
 * @param head
 */
function hasCycle2(head: ListNode | null): boolean {
  let map = new Map()
  while (head) {
    if (map.has(head)) return true
    map.set(head, true) // 存的是节点的地址引用，而不是节点值
    head = head.next
  }
  return false
}

function hasCycle(head: ListNode | null): boolean {
  let i = 0
  let size = 100000
  let node = head
  while (++i <= size) {
    if (!node) return false
    node = node.next
  }
  return true
}

export default hasCycle
