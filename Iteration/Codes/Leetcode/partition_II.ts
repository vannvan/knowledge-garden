/*
 * Description: 86：分隔链表
 * Url: https://leetcode.cn/problems/partition-list/
 * Tags: 链表  双指针
 * Created: 2023-04-05 18:33:14
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-05 18:46:44
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

function partition1(head: ListNode | null, x: number): ListNode | null {
  // Think for yourself for 5 minutes...
  let small = new ListNode(-1)
  const smallHead = small
  let bigger = new ListNode(-1)
  const biggerHead = bigger

  while (head) {
    if (head.val < x) {
      small.next = head
      small = small.next
    } else {
      bigger.next = head
      bigger = bigger.next
    }
    head = head.next
  }

  bigger.next = null
  small.next = biggerHead.next

  return smallHead.next
}

function partition(head: ListNode | null, x: number): ListNode | null {
  const dummy1 = new ListNode(-1)
  const dummy2 = new ListNode(-1)

  let p1 = dummy1
  let p2 = dummy2
  // p负责遍历原链表
  let p = head
  while (p !== null) {
    if (p.val >= x) {
      p2.next = p
      p2 = p2.next
    } else {
      p1.next = p
      p1 = p1.next
    }

    // 断开原链表中的每个节点的指针
    let tmp = p.next
    p.next = null
    p = tmp
  }

  p1.next = dummy2.next
  return dummy1.next
}

export default partition
