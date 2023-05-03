/*
 * Description: 129：求根节点到叶节点数字之和
 * Url: https://leetcode.cn/problems/sum-root-to-leaf-numbers/
 * Tags: 树  深度优先搜索  二叉树
 * Created: 2023-05-02 21:48:17
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-03 22:31:35
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

function sumNumbers(root: TreeNode | null): number {
  // Think for yourself for 5 minutes...
  // q1. 找到所有路径

  // const paths = []

  let sum = 0

  const backTrack = (node: TreeNode, path: string) => {
    // 到达了叶子节点
    if (node.left === null && node.right === null && node.val !== null) {
      path += '' + node.val
      // paths.push(path)

      sum += Number(path)

      return
    }
    path += node.val
    node.left && backTrack(node.left, path)
    node.right && backTrack(node.right, path)
  }
  if (root === null) return 0
  backTrack(root, '')

  // let sum = 0
  // for (const val of paths) {
  //   sum += Number(val)
  // }

  return sum
}
export default sumNumbers
