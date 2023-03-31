/*
 * Description: 222：完全二叉树的节点个数
 * Url: https://leetcode.cn/problems/count-complete-tree-nodes/
 * Tags: 树  深度优先搜索  二分查找  二叉树
 * Created: 2023-03-31 21:32:18
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-31 22:44:16
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

function countNodes(root: TreeNode | null): number {
  // Think for yourself for 5 minutes...
  if (!root) return 0

  let count = 0
  const dfs = (node: TreeNode) => {
    if (node.val) count++

    node.left && dfs(node.left)
    node.right && dfs(node.right)
  }
  dfs(root)
  return count
}
export default countNodes
