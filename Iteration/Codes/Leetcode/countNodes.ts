/*
 * Description: 222：完全二叉树的节点个数
 * Url: https://leetcode.cn/problems/count-complete-tree-nodes/
 * Tags: 树  深度优先搜索  二分查找  二叉树
 * Created: 2023-03-31 21:32:18
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-31 23:02:46
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
 * 不对
 * @param root
 * @returns
 */
function countNodes1(root: TreeNode | null): number {
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

/**
 * 易理解版
 * @param root
 * @returns
 */
function countNodes2(root: TreeNode | null): number {
  // 递归法计算二叉树节点数
  // 1. 确定递归函数参数
  const getNodeSum = function (node) {
    //2. 确定终止条件
    if (node === null) {
      return 0
    }
    //3. 确定单层递归逻辑
    let leftNum = getNodeSum(node.left)
    let rightNum = getNodeSum(node.right)
    return leftNum + rightNum + 1
  }
  return getNodeSum(root)
}

/**
 * 精简版
 * @param root
 * @returns
 */
function countNodes(root: TreeNode | null): number {
  if (!root) return 0
  return countNodes(root.left) + countNodes(root.right) + 1
}

export default countNodes
