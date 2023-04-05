/*
 * Description:
 * Created: 2023-04-05 13:04:39
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-05 13:32:20
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
// class ListNode {
//   val: number
//   next: ListNode | null
//   constructor(val?: number, next?: ListNode | null) {
//     this.val = val === undefined ? 0 : val
//     this.next = next === undefined ? null : next
//   }
// }

export class ListNode {
  public val: number
  public next: ListNode | null = null
  public head: ListNode | null = null
  constructor(value?: number) {
    this.val = value
    this.next = null
    this.head = null
  }

  add(data: number) {
    let node = new ListNode(data)
    if (this.head === null) {
      this.head = node
    } else {
      let current = this.head
      // 从头开始捋一遍，添加到最后
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
  }
}
