/*
 * Description: 25：K 个一组翻转链表
 * Url: https://leetcode.cn/problems/reverse-nodes-in-k-group/
 * Tags: 递归  链表
 * Created: 2023-04-07 20:40:52
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-07 21:29:09
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

function reverse(head: ListNode, tail: ListNode) {
  let pre = tail.next
  let p = head
  while (pre !== tail) {
    const next = p.next
    p.next = pre
    pre = p
    p = next
  }

  return [tail, head]
}

/**
 * 常规解法
 * @param head
 * @param k
 */
function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  // Think for yourself for 5 minutes...
  const dummy = new ListNode(-1)
  dummy.next = head

  // 子链表在完成反转之前它一直都不会变
  let pre = dummy

  // 使用原始head前进
  while (head) {
    let tail = pre

    // 剩余部分长度是否满足k长度
    for (let i = 0; i < k; i++) {
      tail = tail.next // 一直走到k位置
      // 当tail为null时，说明剩余长度不够k个了，直接返回
      if (tail === null) {
        return dummy.next
      }
    }

    // 在反转这个区间之前将最后一个节点的next存一份
    const next = tail.next

    ;[head, tail] = reverse(head, tail)

    // 把子链表接回原链表

    pre.next = head
    tail.next = next
    pre = tail
    head = tail.next
  }

  return dummy.next
}

function reverseSection(a: ListNode, b: ListNode) {
  let pre = null
  let cur = a
  let next = a
  while (cur !== b) {
    next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }

  return pre
}

/**
 * 递归法
 * @param head
 * @param k
 */
function reverseKGroup1(head: ListNode | null, k: number): ListNode | null {
  let a = head
  let b = head

  for (let i = 0; i < k; i++) {
    if (b == null) return head
    b = b.next
  }

  const newHead = reverseSection(a, b)
  a.next = reverseKGroup1(b, k)
  return newHead
}

function reverseSection1(left: ListNode, right: ListNode) {
  let pre = right
  while (left != right) {
    const next = left.next
    left.next = pre
    pre = left
    left = next
  }

  return pre
}

function reverseKGroup2(head: ListNode | null, k: number): ListNode | null {
  let node = head
  for (let i = 0; i < k; i++) {
    if (node == null) return head
    node = node.next
  }
  let newHead = reverseSection1(head, node)
  head.next = reverseKGroup2(node, k)
  return newHead
}

export default reverseKGroup
