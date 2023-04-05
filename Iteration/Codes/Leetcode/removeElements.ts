/*
 * Description: 203：移除链表元素
 * Url: https://leetcode.cn/problems/remove-linked-list-elements/
 * Tags: 递归  链表
 * Created: 2023-04-05 13:05:08
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-05 13:44:18
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

function removeElements1(head: ListNode | null, val: number): ListNode | null {
  // Think for yourself for 5 minutes...
  // 删除头部节点
  while (head !== null && head.val === val) {
    head = head.next
  }
  if (head === null) return head
  let pre: ListNode = head
  let cur: ListNode | null = head.next
  // 删除非头部节点
  while (cur) {
    if (cur.val === val) {
      pre.next = cur.next
    } else {
      pre = pre.next
    }
    cur = cur.next // 最后一项的next为null就能结束了
  }
  return head
}

/*
 * 递归
 */
function removeElements(head: ListNode | null, val: number): ListNode | null {
  if (head === null) {
    return head
  }
  head.next = removeElements(head.next, val)
  return head.val === val ? head.next : head
}

export default removeElements
