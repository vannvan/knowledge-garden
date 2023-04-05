/*
 * Description: 707. 设计链表
 * Url: https://leetcode.cn/problems/design-linked-list/
 * Created: 2023-04-05 13:49:34
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-05 14:23:54
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

class ListNode {
  public val: number
  public next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

class MyLinkedList {
  private size: number
  private head: ListNode | null
  private tail: ListNode | null
  constructor() {
    this.size = 0
    this.head = null
    this.tail = null
  }

  /**
   * 获取指定索引的元素
   * 如果下标无效，则返回 -1
   * @param index
   */
  public get(index: number): number {
    if (index < 0 || index >= this.size) return -1
    return this.getNode(index).val
  }
  /**
   * 添加到头部
   * 在插入完成后，新节点会成为链表的第一个节点
   * @param val
   */
  public addAtHead(val: number): void {
    const node = new ListNode(val, this.head)
    this.head = node
    this.size++
    // 没有尾结点，说明只有一个 node 节点，记录尾结点
    if (!this.tail) this.tail = node
  }

  /**
   * 添加到尾部
   * 追加到链表中作为链表的最后一个元素
   * @param val
   */
  public addAtTail(val: number): void {
    const node = new ListNode(val, null)
    this.size++
    if (this.tail) {
      // 更新尾结点
      this.tail.next = node
      this.tail = node
      return
    }
    // 没有尾结点，说明只有一个节点
    this.tail = node
    this.head = node
  }
  /**
   * 将一个值为 val 的节点插入到链表中下标为 index 的节点之前
   * @param index
   * @param val
   * @returns
   */
  public addAtIndex(index: number, val: number): void {
    if (index > this.size) return

    // 添加到头部
    if (index <= 0) {
      this.addAtHead(val)
      return
    }
    // 添加到尾部
    if (index === this.size) {
      this.addAtTail(val)
      return
    }
    // 其他情况
    const node = this.getNode(index - 1)
    node.next = new ListNode(val, node.next)
    this.size++
  }

  /**
   * 如果下标有效，则删除链表中下标为 index 的节点
   * @param index
   * @returns
   */
  public deleteAtIndex(index: number): void {
    // 在[0,size)之外到都无效
    if (index < 0 || index >= this.size) return
    if (index === 0) {
      this.head = this.head.next
      this.size--
      return
    }
    // 当前节点删掉 需要把前一个节点和后一个节点关系续上
    const node = this.getNode(index - 1)
    node.next = node.next.next
    // 如果 index 是尾结点，更新尾结点
    if (index === this.size - 1) {
      this.tail = node
    }
    this.size--
  }
  getNode(index: number): ListNode {
    let cur = new ListNode(0, this.head) // 哨兵节点
    while (index-- >= 0) {
      cur = cur.next
    }
    return cur
  }
}

export default MyLinkedList
