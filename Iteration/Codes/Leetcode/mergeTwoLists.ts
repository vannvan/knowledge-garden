/*
 * Description: 21：合并两个有序链表
 * Url: https://leetcode.cn/problems/merge-two-sorted-lists/
 * Tags: 递归  链表
 * Created: 2023-04-05 16:07:06
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-05 16:07:33
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

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const dummyHead = new ListNode(-1)
  let p = dummyHead

  let p1 = list1
  let p2 = list2

  while (p1 !== null && p2 !== null) {
    if (p1.val > p2.val) {
      p.next = p2
      p2 = p2.next
    } else {
      p.next = p1
      p1 = p1.next
    }

    p = p.next
  }

  if (p1 !== null) {
    p.next = p1
  }

  if (p2 !== null) {
    p.next = p2
  }

  return dummyHead.next
}
export default mergeTwoLists
