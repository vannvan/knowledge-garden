/*
 * Description: 83：删除排序链表中的重复元素
 * Url: https://leetcode.cn/problems/remove-duplicates-from-sorted-list/
 * Tags: 链表
 * Created: 2023-04-07 22:25:37
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-07 22:32:04
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

function deleteDuplicates(head: ListNode | null): ListNode | null {
  // Think for yourself for 5 minutes...
  let slow = head
  let fast = head
  while (fast !== null) {
    if (slow.val !== fast.val) {
      slow.next = fast
      slow = slow.next
    }
    fast = fast.next
  }
  slow.next = null
  return head
}

function deleteDuplicates1(head: ListNode | null): ListNode | null {
  if (!head) {
    return head
  }

  let cur = head
  while (cur.next) {
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next
    } else {
      cur = cur.next
    }
  }
  return head
}

export default deleteDuplicates
