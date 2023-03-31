/*
 * Description: 110：平衡二叉树
 * Url: https://leetcode.cn/problems/balanced-binary-tree/
 * Tags: 树  深度优先搜索  二叉树
 * Created: 2023-03-31 23:05:42
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-31 23:23:54
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

/*
  高度计算函数
*/
const height = (node: TreeNode | null) => {
  if (node === null) {
    return 0
  }
  return Math.max(height(node.left), height(node.right)) + 1
}

function isBalanced1(root: TreeNode | null): boolean {
  if (root === null) {
    return true
  }
  return (
    Math.abs(height(root.left) - height(root.right)) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  )
}

function getDepth(root: TreeNode | null): number {
  if (root === null) return 0
  let leftDepth: number = getDepth(root.left)
  if (leftDepth === -1) return -1
  let rightDepth: number = getDepth(root.right)
  if (rightDepth === -1) return -1
  if (Math.abs(leftDepth - rightDepth) > 1) return -1
  return 1 + Math.max(leftDepth, rightDepth)
}
function isBalanced(root: TreeNode | null): boolean {
  // Think for yourself for 5 minutes...
  return getDepth(root) !== -1
}

export default isBalanced
