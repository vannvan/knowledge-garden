/*
 * Description: 112：路径总和
 * Url: https://leetcode.cn/problems/path-sum/
 * Tags: 树  深度优先搜索  广度优先搜索  二叉树
 * Created: 2023-04-02 18:25:09
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-02 18:32:32
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
 * 常规递归
 * @param root
 * @param targetSum
 * @returns
 */
function hasPathSum1(root: TreeNode | null, targetSum: number): boolean {
  // Think for yourself for 5 minutes...
  let count = 0
  const traverse = (node: TreeNode, sum: number) => {
    // 递归到叶子节点就终止
    if (!node) return
    if (node.left === null && node.right === null && node.val !== null) {
      sum += node.val
      if (sum === targetSum) count++
      return
    }
    sum += node.val
    node.left && traverse(node.left, sum)
    node.right && traverse(node.right, sum)
  }

  traverse(root, 0)

  return count > 0
}

/**
 * 精简
 * @param root
 * @param targetSum
 * @returns
 */
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (root == null) return false
  if (root.left == null && root.right == null && root.val === targetSum) return true
  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val)
}
export default hasPathSum
