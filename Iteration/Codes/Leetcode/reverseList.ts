/*
 * Description: 206：反转链表
 * Url: https://leetcode.cn/problems/reverse-linked-list/
 * Tags: 递归  链表
 * Created: 2023-04-05 14:42:47
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-05 14:54:24
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

function reverseList1(head: ListNode | null): ListNode | null {
  // Think for yourself for 5 minutes...
  let cur = head
  let pre = null
  while (cur) {
    // [1,2,3]  可以理解为cur此时为2 tmp的作用是将1和3调换
    let tmp = cur.next
    cur.next = pre
    pre = cur
    cur = tmp
  }
  return pre
}

function reverseList(head: ListNode | null): ListNode | null {
  const reverse = (pre: ListNode | null, cur: ListNode) => {
    if (cur === null) return pre
    let tmp = cur.next
    cur.next = pre
    return reverse(cur, tmp)
  }

  return reverse(null, head)
}

export default reverseList
