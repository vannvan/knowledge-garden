/*
 * Description: 19：删除链表的倒数第 N 个结点
 * Url: https://leetcode.cn/problems/remove-nth-node-from-end-of-list/
 * Tags: 链表  双指针
 * Created: 2023-04-05 16:31:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-06 19:36:56
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import { ListNode } from './utils/list'

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
 * 找到倒数第k个元素
 * @param head
 * @param k
 */
function findFromEnd(head: ListNode, k: number) {
  let p1 = head
  // 让p1先走到k位置
  for (let i = 0; i < k; i++) {
    p1 = p1.next
  }
  console.log('p1', p1)

  let p2 = head
  // 当p1走到尾部的时候，p2就到了n-k+1的位置
  while (p1 !== null) {
    p2 = p2.next
    p1 = p1.next
  }

  console.log('p2', p2)
  return p2
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  // Think for yourself for 5 minutes...
  let dummy = new ListNode(-1)
  dummy.next = head
  const x = findFromEnd(dummy, n + 1)
  console.log('x->>', x.val)
  // 删掉倒数第 n 个节点
  x.next = x.next.next
  return dummy.next
}

function removeNthFromEnd1(head: ListNode | null, n: number): ListNode | null {
  let dummy = new ListNode(-1)
  dummy.next = head

  let slow = dummy
  let fast = dummy

  // 让fast先走到n位置
  while (n-- && fast != null) {
    fast = fast.next
  }
  // fast再提前走一步，因为需要让slow指向删除节点的上一个节点
  fast = fast.next
  // 当fast走到结尾 slow刚好能走到删除节点的上一个节点
  while (fast != null) {
    fast = fast.next
    slow = slow.next
  }

  // 删掉slow位置的节点
  slow.next = slow.next.next

  return dummy.next
}
export default removeNthFromEnd
