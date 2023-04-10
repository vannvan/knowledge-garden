/*
 * Description: 2：两数相加
 * Url: https://leetcode.cn/problems/add-two-numbers/
 * Tags: 递归  链表  数学
 * Created: 2023-04-10 20:45:53
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-10 21:09:08
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

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  // Think for yourself for 5 minutes...
  // q1. 逆序很关键，说明可以从链表头部开始加，符合加法先从个位开始加的操作
  // q2. 当前位求和大于10时，当前位只存储 sum%10的结果，剩下的进位carry给下一位
  // q3. 当最后计算的进位大于0的时候，说明最高位就是这个进位
  // 例如：123 + 232 和 678 + 434 分别会得到3位和4位的结果，同时，两数相加得到的结果长度最多大于最长加数+1
  // q4. 链表长度不相同时，可以认为短的前面在用0和另一位相加
  let head = null //用于返回结果的
  let tail = null // 用于前进的
  let carry = 0
  while (l1 !== null || l2 !== null) {
    const x1 = l1 ? l1.val : 0
    const x2 = l2 ? l2.val : 0
    const sum = x1 + x2 + carry
    // 一开始都没有的时候先置为一样的值
    if (!head) {
      head = tail = new ListNode(sum % 10)
    } else {
      // head和tail是同一引用啊，因此只更新tail就可以了
      tail.next = new ListNode(sum % 10)
      tail = tail.next
    }

    carry = Math.floor(sum / 10)

    // 开始处理l1和l2长度不相同的情况
    if (l1) {
      l1 = l1.next
    }
    if (l2) {
      l2 = l2.next
    }
  }

  // 例如 554 + 653 最终的结果长度是4位
  if (carry > 0) {
    tail.next = new ListNode(carry)
  }

  return head
}
export default addTwoNumbers
