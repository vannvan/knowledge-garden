/*
 * Description: 142：环形链表 II
 * Url: https://leetcode.cn/problems/linked-list-cycle-ii/
 * Tags: 哈希表  链表  双指针
 * Created: 2023-04-05 17:43:04
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-05 17:51:35
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

function detectCycle(head: ListNode | null): ListNode | null {
  // Think for yourself for 5 minutes...
  // Think for yourself for 5 minutes...
  let slow = head
  let fast = head

  // fast每次前进两步，slow每次前进一步
  while (fast !== null && fast.next != null) {
    slow = slow.next
    fast = fast.next.next
    // 如果两个指针相遇，说明有环
    if (slow === fast) {
      break
    }
  }

  if (fast === null || fast.next === null) {
    // fast能走到头说明没有环
    return null
  }

  // 重新指向头节点
  slow = head

  while (slow != fast) {
    fast = fast.next
    slow = slow.next
  }
  return slow
}
export default detectCycle
