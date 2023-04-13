/*
 * Description: 337：打家劫舍 III
 * Url: https://leetcode.cn/problems/house-robber-iii/
 * Tags: 树  深度优先搜索  动态规划  二叉树
 * Created: 2023-04-13 23:13:47
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-13 23:22:28
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

function rob(root: TreeNode | null): number {
  // Think for yourself for 5 minutes...
  // q1. 0下标表示不偷 1下标表示偷
  const postOrder = (node: TreeNode) => {
    if (!node) return [0, 0]
    const left = postOrder(node.left)
    const right = postOrder(node.right)
    // 不偷当前节点，左右子节点都可以偷或不偷，取最大值
    const DoNot = Math.max(left[0], left[1]) + Math.max(right[0], right[1])
    // 偷当前节点，左右子节点只能不偷
    const Do = node.val + left[0] + right[0]
    // [不偷，偷]
    return [DoNot, Do]
  }

  const res: number[] = postOrder(root)

  return Math.max(...res)
}
export default rob
