/*
 * Description: 二叉搜索树
 * Created: 2023-02-14 22:12:26
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-16 22:35:24
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

// 节点对象

class Node {
  constructor(data) {
    this.root = this
    this.data = data
    this.left = null
    this.right = null
  }
}

class BST {
  constructor() {
    this.root = null
  }

  /**
   *
   * @param {any} data
   */
  insert(data) {
    let newNode = new Node(data)
    let insertData = (node, newNode) => {
      // 当前值与上一级对比小的话
      if (newNode.data < node.data) {
        // 如果当前的下一级左边没有就给左边
        if (node.left === null) {
          node.left = newNode
        } else {
          // 给当前左边的更下一级的左边
          insertData(node.left, newNode)
        }
      } else {
        if (node.right === null) {
          node.right = newNode
        } else {
          insertData(node.right, newNode)
        }
      }
    }

    // 如果没有根节点就把当前节点作为根节点
    if (!this.root) {
      this.root = newNode
    } else {
      insertData(this.root, newNode)
    }
  }

  /**
   * 先序遍历
   * @returns []
   */
  preOrder() {
    let results = []
    const order = (node) => {
      if (node != null) {
        results.push(node.data)
        order(node.left)
        order(node.right)
      }
    }
    order(this.root)
    return results
  }

  /**
   * 中序遍历
   * @returns []
   */
  inOrder() {
    let results = []
    const order = (node) => {
      if (node != null) {
        order(node.left)
        results.push(node.data)
        order(node.right)
      }
    }
    order(this.root)
    return results
  }

  /**
   * 后序遍历
   * @returns []
   */
  postOrder() {
    let results = []
    const order = (node) => {
      if (node != null) {
        order(node.left)
        order(node.right)
        results.push(node.data)
      }
    }
    order(this.root)
    return results
  }

  min() {
    return this.minNode(this.root)
  }

  minNode(node) {
    let current = node
    while (current != null && current.left != null) {
      current = current.left
    }
    return current.data
  }

  max() {
    return this.maxNode(this.root)
  }

  maxNode(node) {
    let current = node
    while (current != null && current.right != null) {
      current = current.right
    }
    return current.data
  }

  /**
   * 查找值
   * @param {any} data
   * @returns boolean
   */
  find(data) {
    let findNode = (node, data) => {
      if (node === null) return false
      if (node.data === data) return true
      return findNode(data < node.data ? node.left : node.right, data)
    }
    return findNode(this.root, data)
  }
}

const datas = [11, 7, 5, 3, 6, 9, 8, 10, 20, 14, 12, 25, 18]

const bst = new BST()

datas.forEach((value) => {
  bst.insert(value)
})
// console.dir(bst)

// let s = bst.inOrder()
// let d = bst.preOrder()
// let k = bst.postOrder()
// console.log(s)
// console.log(d)
// console.log(k)

console.log('min', bst.min())

console.log('max', bst.max())

console.log('find 8', bst.find(8))

console.log('find 21', bst.find(21))
