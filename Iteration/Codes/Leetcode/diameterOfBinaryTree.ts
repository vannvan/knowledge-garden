/*
 * Description: 543：二叉树的直径
 * Url: https://leetcode.cn/problems/diameter-of-binary-tree/
 * Tags: 树  深度优先搜索  二叉树
 * Created: 2023-04-12 22:18:35
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-12 22:18:51
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

function diameterOfBinaryTree(root: TreeNode | null): number {
  let ans = 1
  function maxDepth(root: TreeNode | null): number {
    if (root === null) return 0

    let leftDepth = maxDepth(root.left)
    let rightDepth = maxDepth(root.right)
    ans = Math.max(ans, leftDepth + rightDepth + 1)
    return Math.max(leftDepth, rightDepth) + 1
  }

  maxDepth(root)
  return ans - 1
}
export default diameterOfBinaryTree
