/*
 * Description: 148：排序链表
 * Url: https://leetcode.cn/problems/sort-list/
 * Tags: 链表  双指针  分治  排序  归并排序
 * Created: 2023-04-15 18:47:06
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-15 18:51:44
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
      p2 = p2.next // p2小 往后移动
    } else {
      p.next = p1
      p1 = p1.next // p1小 往后移动
    }

    p = p.next // 往后移动
  }

  // 还没用完的情况
  if (p1 !== null) {
    p.next = p1
  }

  if (p2 !== null) {
    p.next = p2
  }

  return dummyHead.next
}

function doSortList(head: ListNode, tail: ListNode | null) {
  //
  if (head === null) return head

  if (head.next === tail) {
    head.next = null
    return head
  }
  let slow = head
  let fast = head
  while (fast !== tail) {
    slow = slow.next
    fast = fast.next
    // fast多走一步
    if (fast !== tail) {
      fast = fast.next
    }
  }

  // 此时slow就在中间位置了
  const mid = slow

  return mergeTwoLists(doSortList(head, mid), doSortList(mid, tail))
}

function sortList(head: ListNode | null): ListNode | null {
  // Think for yourself for 5 minutes...
  return doSortList(head, null)
}
export default sortList
