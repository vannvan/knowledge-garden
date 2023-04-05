/*
 * Description: 24：两两交换链表中的节点
 * Url: https://leetcode.cn/problems/swap-nodes-in-pairs/
 * Tags: 递归  链表
 * Created: 2023-04-05 15:15:59
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-05 15:39:13
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
 * 迭代法
 * @param head
 * @returns
 */
function swapPairs1(head: ListNode | null): ListNode | null {
  // Think for yourself for 5 minutes...
  let dummyHead = new ListNode(0) // 虚拟头节点
  dummyHead.next = head
  let curNode = dummyHead

  while (curNode && curNode.next && curNode.next.next) {
    // [0,1,2,3] 其中0是虚拟头节点， tmp1为1 tmp2为2
    // step1 将0和2调换
    // step2 将调换后的2的next指向1
    // step3 将1的next指向1

    let firstNode: ListNode = curNode.next // 1
    let secNode: ListNode = curNode.next.next // 2
    let thirdNode: ListNode | null = curNode.next.next.next // 3
    curNode.next = secNode // step1
    secNode.next = firstNode // step2
    firstNode.next = thirdNode // step3
    curNode = firstNode // 向后移动一位准备下一轮交换
  }

  return dummyHead.next
}

/**
 * 递归法
 * @param head
 */
function swapPairs(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return head

  const next = head.next
  head.next = swapPairs(next.next)
  next.next = head
  return next
}

export default swapPairs
