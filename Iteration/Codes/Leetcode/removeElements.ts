/*
 * Description: 203：移除链表元素
 * Url: https://leetcode.cn/problems/remove-linked-list-elements/
 * Tags: 递归  链表
 * Created: 2023-04-05 13:05:08
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-30 21:07:27
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

/**
 * 更清晰的递归
 * @param head
 * @param val
 * @returns
 */
function removeElements3(head: ListNode | null, val: number): ListNode | null {
  // if(head === null) return head
  // head.next = removeElements(head.next,val)
  // return head.val === val ? head.next:head

  const remove = (node: ListNode, val: number) => {
    if (node === null) return node

    node.next = remove(node.next, val)
    if (node.val === val) {
      return node.next
    } else {
      return node
    }
  }
  return remove(head, val)
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

/**
 * 借助虚拟头节点
 * @param head
 * @param val
 * @returns
 */
function removeElements2(head: ListNode | null, val: number): ListNode | null {
  // 移除前后节点的关系
  const dummy = new ListNode(-1)
  dummy.next = head
  let curr = dummy
  let pre = dummy
  while (curr) {
    if (curr.val === val) {
      pre.next = curr.next
    } else {
      pre = curr
    }
    curr = curr.next
  }
  return dummy.next
}

export default removeElements
