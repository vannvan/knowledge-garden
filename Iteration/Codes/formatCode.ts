function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const dummy = new ListNode(-1)
  let p = dummy
  while (list1 && list2) {
    // 先用小的
    if (list1.val < list2.val) {
      p.next = list1
      list1 = list1.next
    } else {
      p.next = list2
      list2 = list2.next
    }
    p = p.next
  }

  // 还没有用完的情况
  if (list1) {
    p.next = list1
  }

  if (list2) {
    p.next = list2
  }

  return dummy.next
}
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const merge = (p1: ListNode, p2: ListNode) => {
    if (p1 === null) return p2
    if (p2 === null) return p1
    if (p1.val < p2.val) {
      p1.next = merge(p1.next, p2)
      return p1
    } else {
      p2.next = merge(p1, p2.next)
      return p2
    }
  }

  return merge(list1, list2)
}
