function rotateRight(head: ListNode | null, k: number): ListNode | null {
  if (head === null || head.next === null) return head

  // let len = 0
  // let cur = head
  // while (cur) {
  //   len++
  //   if (!cur.next) break
  //   cur = cur.next
  // }
  let len: number = 1
  let cur: ListNode = head
  while (cur.next) {
    cur = cur.next
    len++
  }

  // 计算实际要进行旋转的所在点
  let step: number = len - (k % len)

  // 等于没翻，直接返回
  if (step === len) return head

  cur.next = head

  while (step) {
    cur = cur.next
    step--
  }
  // 摘出后半段
  const rest = cur.next
  // 掐断前半段原来的关系
  cur.next = null
  return rest
}
