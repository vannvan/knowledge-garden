/*
 * Description: 206：反转链表
 * Url: https://leetcode.cn/problems/reverse-linked-list/
 * Tags: 递归  链表
 * Created: 2023-04-05 14:42:47
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-06 23:46:29
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

function reverseList2(head: ListNode | null): ListNode | null {
  const reverse = (pre: ListNode | null, cur: ListNode) => {
    if (cur === null) return pre
    let tmp = cur.next
    cur.next = pre
    return reverse(cur, tmp)
  }

  return reverse(null, head)
}
const reverseList3 = function (head) {
  // console.log('head0', head.val, head.next)
  if (head === null || head.next === null) {
    return head
  }
  console.log(`此时head为${head.val}`)
  const last = reverseList(head.next)
  // [1,2,3]
  // console.log('head1', head.val)
  head.next.next = head // head为1时，head.next.next = head 即2.next->1 此时 1<->2 他俩成环了
  head.next = null // head 因此要将1.next置为null 此时只有1<-2了
  return last
}

/**
 * 头插法
 * @param head
 */
const reverseList = (head: ListNode) => {
  let newhead = null
  let tmp = null
  if (head == null || head.next === null) {
    return head
  }

  while (head != null) {
    tmp = head
    head = head.next

    tmp.next = newhead
    newhead = tmp
  }

  return newhead
}
export default reverseList
