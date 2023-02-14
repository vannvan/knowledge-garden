/**
 * 二叉树实现
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

  insert(data) {
    const newNode = new Node(data)
    let insertData = (node, newNode) => {
      // 优先左边
      // 当前值与上一级对比小的话
      if (newNode.data < data) {
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

  // 先
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

  // 中
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

  // 后
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
}

const datas = [11, 7, 5, 3, 6, 9, 8, 10, 20, 14, 12, 25, 18]

const bst = new BST()

datas.forEach((value) => {
  bst.insert(value)
})
let s = bst.inOrder()
let d = bst.preOrder()
let k = bst.postOrder()
console.log(s)
console.log(d)
console.log(k)
