/*
 * Description: 437：路径总和 III
 * Url: https://leetcode.cn/problems/path-sum-iii/
 * Tags: 树  深度优先搜索  二叉树
 * Created: 2023-04-11 23:14:41
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-14 22:18:35
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

function pathSum(root: TreeNode | null, targetSum: number): number {
  // Think for yourself for 5 minutes...
  let count = 0
  // 对每一层的left和right采用dfs2进行递归
  const dfs1 = (node: TreeNode) => {
    if (node === null) return
    dfs2(node, node.val)
    dfs1(node.left)
    dfs1(node.right)
  }

  // 根节点的子节点
  const dfs2 = (node: TreeNode, val: number) => {
    if (val === targetSum) count++
    node.left && dfs2(node.left, val + node.left.val)
    node.right && dfs2(node.right, val + node.right.val)
  }
  if (root === null) return 0
  dfs1(root)
  return count
}

export default pathSum
