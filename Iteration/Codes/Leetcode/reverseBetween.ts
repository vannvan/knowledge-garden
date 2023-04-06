/*
 * Description: 92：反转链表 II
 * Url: https://leetcode.cn/problems/reverse-linked-list-ii/
 * Tags: 链表
 * Created: 2023-04-06 22:25:16
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-06 22:45:15
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

const reverseLinkedList = (head: ListNode) => {
  let pre = null
  let cur = head

  while (cur) {
    const next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
}

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
  // Think for yourself for 5 minutes...
  // q1. 主要分为两大步 step1 将left->right区间的链表反转，step2 将反转后的子链表头尾和原链表关系续上
  const dummy = new ListNode(-1)
  dummy.next = head

  let pre = dummy
  // 1 先让pre到达left的前一个节点
  for (let i = 0; i < left - 1; i++) {
    pre = pre.next
  }

  let rightNode = pre
  // 2 从pre再走right-left+1步，到达right节点
  for (let i = 0; i < right - left + 1; i++) {
    rightNode = rightNode.next
  }

  // 3 切出一个子链表
  let leftNode = pre.next
  let curr = rightNode.next // 靠右边的后继节点

  // 断开链接
  pre.next = null
  rightNode.next = null

  // 4 翻转子区间
  reverseLinkedList(leftNode)

  // 5 接回到原来的链表中
  pre.next = rightNode // 跟原来的左边续上
  leftNode.next = curr // 跟右边续上
  return dummy.next
}
export default reverseBetween
