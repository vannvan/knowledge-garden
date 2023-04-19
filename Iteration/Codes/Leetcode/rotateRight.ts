/*
 * Description: 61：旋转链表
 * Url: https://leetcode.cn/problems/rotate-list/
 * Tags: 链表  双指针
 * Created: 2023-04-19 23:26:27
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-20 00:00:34
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

function rotateRight(head: ListNode | null, k: number): ListNode | null {
  // Think for yourself for 5 minutes...
  // q1. 如果链表长度为n，加入k=n时，实际上就会将链表移动为原来的形状，因此对于k>=n时，仅需向前移动k%n次即可完成
  // q2. 我们可以让链表形成环结构，形成一个新链表后，再从k%n的位置将其断开
  if (head === null || !head.next || k < 0) return head

  let n = 1
  let cur = head
  while (cur.next) {
    cur = cur.next
    n++
  }

  // let add = (n - k) % n
  let add = n - (k % n)
  if (add === n) return head

  // 末尾节点和头节点相连
  cur.next = head
  // 从尾部走到add的位置
  while (add) {
    cur = cur.next
    add--
  }

  const ret = cur.next
  cur.next = null

  return ret
}

export default rotateRight
