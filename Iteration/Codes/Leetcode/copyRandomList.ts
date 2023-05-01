/*
 * Description: 138：复制带随机指针的链表
 * Url: https://leetcode.cn/problems/copy-list-with-random-pointer/
 * Tags: 哈希表  链表
 * Created: 2023-05-01 23:08:13
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-01 23:36:46
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

class Node {
  val: number
  next: Node | null
  random: Node | null
  constructor(val?: number, next?: Node, random?: Node) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
    this.random = random === undefined ? null : random
  }
}
const cachedNode = new Map()
function copyRandomList(head: Node | null): Node | null {
  // Think for yourself for 5 minutes...
  if (head === null) {
    return null
  }
  if (!cachedNode.has(head)) {
    cachedNode.set(head, { val: head.val }),
      Object.assign(cachedNode.get(head), {
        next: copyRandomList(head.next),
        random: copyRandomList(head.random),
      })
  }
  return cachedNode.get(head)
}

function copyRandomList1(head: Node | null): Node | null {
  if (head === null) {
    return null
  }

  let p = head
  // 1. 在每个节点后面创建一个新节点
  //1->1'->2->2'->3->3'
  while (p !== null) {
    let newNode = new Node(p.val) // 生成一个和原节点值相同的新节点
    newNode.next = p.next
    p.next = newNode
    p = newNode.next // 往后移动
  }

  // 2. 将原节点的random关系给新节点
  p = head
  while (p !== null) {
    if (p.random !== null) {
      p.next.random = p.random.next
    }
    p = p.next.next
  }

  let dummy = new Node(-1)
  // 3. 将链表分离
  p = head
  let cur = dummy
  while (p !== null) {
    cur.next = p.next
    cur = cur.next
    p.next = cur.next
    p = p.next
  }

  return dummy.next
}

export default copyRandomList
