/*
 * Description: 404：左叶子之和
 * Url: https://leetcode.cn/problems/sum-of-left-leaves/
 * Tags: 树  深度优先搜索  广度优先搜索  二叉树
 * Created: 2023-04-02 17:25:21
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-02 17:39:10
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

function sumOfLeftLeaves1(root: TreeNode | null): number {
  // Think for yourself for 5 minutes...
  // q1. 左叶子满足node.left != null && node.left.left === null && node.left.right === null
  // q2. 分别去找一个节点的左后代节点的左叶子和右后代节点的左叶子

  if (root === null) return 0
  if (root.left === null && root.right === null) return 0

  let leftValue = sumOfLeftLeaves(root.left)
  if (root.left !== null && root.left.left === null && root.left.right === null) {
    leftValue = root.left.val
  }

  let rightValue = sumOfLeftLeaves(root.right)

  let sum = leftValue + rightValue

  return sum
}

function sumOfLeftLeaves(root: TreeNode | null): number {
  let helperStack: TreeNode[] = []
  let sum: number = 0
  if (root !== null) helperStack.push(root)
  while (helperStack.length > 0) {
    const tempNode = helperStack.pop()!
    if (tempNode.left !== null && tempNode.left.left === null && tempNode.left.right === null) {
      sum += tempNode.left.val
    }
    tempNode.right && helperStack.push(tempNode.right)
    tempNode.left && helperStack.push(tempNode.left)
  }
  return sum
}
export default sumOfLeftLeaves
