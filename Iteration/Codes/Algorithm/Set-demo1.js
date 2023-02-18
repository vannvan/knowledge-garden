/*
 * Description:  集合
 * Created: 2023-02-18 11:27:00
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-18 11:57:12
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

class Set {
  constructor() {
    this.items = {}
  }
  add(item) {
    if (!this.items[item]) {
      this.items[item] = item
      return true
    }
    return false
  }

  delete(item) {
    if (this.has(item)) {
      delete this.items[item]
      return true
    }
    return false
  }

  has(item) {
    // return item in this.items
    return Object.prototype.hasOwnProperty.call(this.items, item)
  }

  size() {
    return Object.keys(this.values).length
  }

  clear() {
    this.items = {}
  }

  values() {
    // return Object.values(this.items)
    let values = []
    for (let key in this.items) {
      if (this.items.hasOwnProperty(key)) {
        values.push(key)
      }
    }
    return values
  }

  /**
   * 并集
   * @param {*} otherSet
   */
  union(otherSet) {
    const unionSet = new Set()
    this.values().forEach((value) => unionSet.add(value))
    otherSet.values().forEach((value) => unionSet.add(value))
    return unionSet
  }

  /**
   * 交集
   * @param {*} otherSet
   */
  intersection(otherSet) {
    const intersectionSet = new Set()
    const biggerSetValues = this.size() > otherSet.size() ? this.values() : otherSet.values()
    const smallerSetValues = this.size() < otherSet.size() ? otherSet.values() : this.values()

    biggerSetValues.map((el) => {
      if (smallerSetValues.includes(el)) {
        intersectionSet.add(el)
      }
    })
    return intersectionSet
  }

  /**
   * 差集
   * @param {*} otherSet
   */
  difference(otherSet) {
    const differenceSet = new Set()
    this.values().map((el) => {
      if (!otherSet.values().includes(el)) {
        differenceSet.add(el)
      }
    })
    return differenceSet
  }

  isSubSetOf(otherSet) {
    if (this.size() > otherSet.size()) {
      return false
    }
    let isSubSet = true
    this.values().every((item) => {
      if (!otherSet.has(item)) {
        isSubSet = false
        return false
      }
      return true
    })

    return isSubSet
  }
}

const set = new Set()

set.add(1)
set.add(3)
set.add(2)

set.delete(2)

// 用来求并集
const setB = new Set()
setB.add(4)
setB.add(5)

// 用来求交集
const setC = new Set()
setC.add(1)
setC.add(4)
setC.add(3)
setC.add(6)

// 用来求差集
const setD = new Set()
setD.add(1)
setD.add(2)
setD.add(3)

// 用来验证子集
const setE = new Set()
setE.add(1)
setE.add(3)
setE.add(5)

console.log('values', set.values())

console.log(set)

console.log('unionSet', set.union(setB))

console.log('intersectionSet', set.intersection(setC))

console.log('differenceSet', set.difference(setD))

console.log('isSubSetOf', set.isSubSetOf(setE))
