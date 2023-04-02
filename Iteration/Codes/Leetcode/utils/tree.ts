/*
 * Description:  二叉树
 * Created: 2023-03-31 21:32:55
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-02 21:26:58
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

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

class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

/**
 * 二叉搜索树
 */
class BST implements TreeNode {
  root: any
  left: TreeNode
  right: TreeNode
  val: number | undefined
  constructor() {
    this.root = null
  }

  /**
   * 插入节点
   * @param {any} data
   */
  insert(data: any) {
    const newNode = new TreeNode(data)
    const insertData = (node: TreeNode, newNode: TreeNode) => {
      // 当前值与上一级对比小的话
      if (newNode && newNode.val < node.val) {
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
    const order = (node: TreeNode) => {
      if (node != null) {
        results.push(node.val)
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
    const order = (node: TreeNode) => {
      if (node != null) {
        order(node.left)
        results.push(node.val)
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
    const order = (node: TreeNode) => {
      if (node != null) {
        order(node.left)
        order(node.right)
        results.push(node.val)
      }
    }
    order(this.root)
    return results
  }

  min() {
    return this.minNode(this.root)
  }

  minNode(node: TreeNode) {
    let current = node
    while (current != null && current.left != null) {
      current = current.left
    }
    return current.val
  }

  max() {
    return this.maxNode(this.root)
  }

  maxNode(node: TreeNode) {
    let current = node
    while (current != null && current.right != null) {
      current = current.right
    }
    return current.val
  }
}

/**
 * 完全二叉树
 */
class CBTInserter {
  private arr: TreeNode[]
  constructor(root: TreeNode | null) {
    this.arr = []
    const queue = [root]
    while (queue.length) {
      const size = queue.length
      for (let i = 0; i < size; i++) {
        const node = queue.pop()
        this.arr.push(node)
        if (node.left) queue.unshift(node.left)
        if (node.right) queue.unshift(node.right)
      }
    }
  }

  insert(val: number): number {
    const node = new TreeNode(val)
    this.arr.push(node)
    const index = this.arr.length
    const parentIndex = (index >> 1) - 1
    if (index % 2 === 0) {
      this.arr[parentIndex].left = node
    } else {
      this.arr[parentIndex].right = node
    }
    return this.arr[parentIndex].val
  }

  /**
   * 层序遍历
   * @param root
   * @returns
   */
  levelOrder(root: TreeNode) {
    //二叉树的层序遍历
    let ans: number[] = []
    const queue: TreeNode[] = []

    queue.push(root)

    if (root === null) {
      return ans
    }
    while (queue.length !== 0) {
      // 记录当前层级节点数,下面queue长度是会变的，因此要在这里存一份
      const length = queue.length
      // 存放每一层的节点
      const curLevel = []
      for (let i = 0; i < length; i++) {
        const node = queue.shift()
        curLevel.push(node.val)
        // 存放当前层下一层的节点
        node.left && queue.push(node.left)
        node.right && queue.push(node.right)
      }
      //把每一层的结果放到结果数组
      ans = ans.concat(curLevel)
    }
    return ans
  }

  get_root(): TreeNode | null {
    return this.arr[0]
  }
}

export { TreeNode, BST, CBTInserter }
