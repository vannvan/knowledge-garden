/*
 * Description: 908：链表的中间结点
 * Url: https://leetcode.cn/problems/middle-of-the-linked-list/
 * Tags: 链表  双指针
 * Created: 2023-04-05 16:56:23
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-05 17:00:20
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

function middleNode(head: ListNode | null): ListNode | null {
  // Think for yourself for 5 minutes...

  let slow = head
  let fast = head

  // fast每次走两步，slow每次走一步
  while (fast !== null && fast.next !== null) {
    slow = slow.next
    fast = fast.next.next
  }

  return slow
}
export default middleNode
