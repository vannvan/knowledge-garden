/*
 * Description: 234：回文链表
 * Url: https://leetcode.cn/problems/palindrome-linked-list/
 * Tags: 栈  递归  链表  双指针
 * Created: 2023-04-11 20:39:21
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-11 20:45:17
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
/**
 * 常规解法 时间复杂度O(n)  空间复杂度O(n)
 * @param head
 * @returns
 */
function isPalindrome1(head: ListNode | null): boolean {
  // Think for yourself for 5 minutes...

  let arr = []

  while (head) {
    arr.push(head.val)
    head = head.next
  }

  let left = 0
  let right = arr.length - 1
  while (left < right) {
    if (arr[left] !== arr[right]) {
      return false
    }
    left++
    right--
  }

  return true
}

/**
 * 快慢指针  空间复杂度O(1)
 * @param head
 * @returns
 */
function isPalindrome(head: ListNode | null): boolean {
  if (head === null || head.next === null) return true
  let slow = head
  let fast = head
  let pre = head
  head = null

  // slow一次走一步，fast一次走两步
  while (fast != null && fast.next != null) {
    slow = slow.next
    fast = fast.next.next
    // 反转前半部分
    pre.next = head
    head = pre
    pre = slow
  }

  // fast能走到null说明是奇数，slow跳过一个
  slow = fast != null ? slow.next : slow

  while (head !== null) {
    if (head.val === slow.val) {
      head = head.next
      slow = slow.next
    } else {
      return false
    }
  }

  return true
}
export default isPalindrome
