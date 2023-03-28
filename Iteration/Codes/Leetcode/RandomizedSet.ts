/*
 * Description: 380：O(1) 时间插入、删除和获取随机元素
 * Url: https://leetcode.cn/problems/insert-delete-getrandom-o1/
 * Tags: 设计  数组  哈希表  数学  随机化
 * Created: 2023-03-28 21:23:17
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-28 21:35:08
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

class RandomizedSet {
  items: number[]
  itemsIndex: {}
  constructor() {
    this.items = []
    this.itemsIndex = {}
  }

  insert(val: number): boolean {
    if (this.itemsIndex[val] !== undefined) return false
    this.itemsIndex[val] = this.items.length
    this.items.push(val)
    return true
  }

  remove(val: number): boolean {
    if (this.itemsIndex[val] === undefined) return false

    let idx = this.itemsIndex[val]
    this.itemsIndex[this.items[this.items.length - 1]] = idx
    // 交换val和最后一个元素
    ;[this.items[idx], this.items[this.items.length - 1]] = [
      this.items[this.items.length - 1],
      this.items[idx],
    ]
    this.items.pop()

    delete this.itemsIndex[val]
    return true
  }

  getRandom(): number {
    let rand = Math.floor(Math.random() * this.items.length)
    return this.items[rand]
  }
}

export default RandomizedSet
