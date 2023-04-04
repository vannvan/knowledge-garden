/*
 * Description: 1114：从二叉搜索树到更大和树
 * Url: https://leetcode.cn/problems/binary-search-tree-to-greater-sum-tree/
 * Tags: 树  深度优先搜索  二叉搜索树  二叉树
 * Created: 2023-04-04 23:05:54
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-04 23:17:38
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

function bstToGst(root: TreeNode | null): TreeNode | null {
  // Think for yourself for 5 minutes...
  // q1. 大于或等于该节点的所有节点之和
  // q2. 大于或等于当前节点的肯定是在右子树，因此优先遍历右子树
  // q3. 右子树存在小于上一级节点的后代节点
  // q4. 因此操作顺序应该是 右->中->左

  let pre = 0 // 记录前一个节点的累加值

  const traversal = (node: TreeNode) => {
    if (!root) return null
    node.right && traversal(node.right)
    node.val += pre
    pre = node.val
    node.left && traversal(node.left)
  }
  traversal(root)
  return root
}
export default bstToGst
