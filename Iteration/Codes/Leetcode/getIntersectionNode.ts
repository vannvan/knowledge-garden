/*
 * Description:  链表相交
 * Created: 2023-04-05 17:31:29
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-05 17:41:54
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 获取链表长度
 * @param head
 */
const getListLen = (head: ListNode) => {
  let len = 0
  let cur = head
  while (cur) {
    len++
    cur = cur.next
  }
  return len
}

/**
 * 注意交点位置是指针相等 不是值相等
 * @param headA
 * @param headB
 * @returns
 */
const getIntersectionNode = (headA: ListNode, headB: ListNode) => {
  let curA = headA
  let curB = headB
  let lenA = getListLen(headA)
  let lenB = getListLen(headB)

  // 让curA为最长链表的头，lenA为其长度
  if (lenA < lenB) {
    ;[curA, curB] = [curB, curA]
    ;[lenA, lenB] = [lenB, lenA]
  }

  let i = lenA - lenB // 长度差

  // 目的是让后面curA和curB在同一起点上
  while (i-- > 0) {
    curA = curA.next
  }

  // 当curA === curB时说明相交了可以退出循环
  while (curA && curA !== curB) {
    curA = curA.next
    curB = curB.next
  }

  return curA
}

export default getIntersectionNode
