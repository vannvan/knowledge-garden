/*
 * Description: 103：二叉树的锯齿形层序遍历
 * Url: https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/
 * Tags: 树  广度优先搜索  二叉树
 * Created: 2023-05-03 21:53:27
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-03 22:15:43
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

/**
 * 迭代法
 * @param root
 * @returns
 */
function zigzagLevelOrder1(root: TreeNode | null): number[][] {
  // Think for yourself for 5 minutes...
  // 1. 奇数层从左往右，偶数层从右往左

  const ans: number[][] = []
  const queue: TreeNode[] = []
  if (root === null) return ans
  queue.push(root)

  while (queue.length !== 0) {
    const length = queue.length
    const curLevel = []
    for (let i = 0; i < length; i++) {
      const node = queue.shift()
      curLevel.push(node.val)
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
    let flag = ans.length % 2 == 1 // 当前奇数，那么下一层就需要反转
    ans.push(flag ? curLevel.reverse() : curLevel)
  }

  return ans
}

/**
 * 递归法
 * @param root
 */
function zigzagLevelOrder(root: TreeNode | null): number[][] {
  const ans: number[][] = []
  if (root === null) return ans

  const traversal = (node: TreeNode, level: number) => {
    if (ans.length === level) {
      ans.push([])
    }
    // 偶数
    if (level % 2 === 0) {
      ans[level].unshift(node.val)
    } else {
      ans[level].push(node.val)
    }
    node.left && traversal(node.left, level + 1)
    node.right && traversal(node.right, level + 1)
  }

  if (root !== null) {
    traversal(root, 0)
  }
  return ans
}

export default zigzagLevelOrder
