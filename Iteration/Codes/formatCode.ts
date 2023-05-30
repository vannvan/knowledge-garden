function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let count = 0
  const remove = (node: ListNode, k: number) => {
    if (node === null) return node
    node.next = remove(node.next, k)
    count++
    if (count === k) {
      return node.next
    } else {
      return node
    }
  }

  return remove(head, n)
}
