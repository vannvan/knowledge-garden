/*
 * Description: 530：二叉搜索树的最小绝对差
 * Url: https://leetcode.cn/problems/minimum-absolute-difference-in-bst/
 * Tags: 树  深度优先搜索  广度优先搜索  二叉搜索树  二叉树
 * Created: 2023-04-03 22:21:17
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-03 22:40:48
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
 * @returns
 */
function getMinimumDifference1(root: TreeNode | null): number {
  // Think for yourself for 5 minutes...
  // q1. 既然是BST，那采用中序遍历就是一个有序数组
  // q2. 考虑节点数量小于2不能构成求差值条件直接返回0
  // q3. 遍历的arr
  const arr = []
  const traversal = (node: TreeNode) => {
    if (!node) return
    traversal(node.left)
    arr.push(node.val)
    traversal(node.right)
  }
  traversal(root)

  if (arr.length < 2) return 0

  let min = Number.MAX_SAFE_INTEGER
  for (let i = 1; i < arr.length; i++) {
    min = Math.min(min, arr[i] - arr[i - 1])
  }

  return min
}
/**
 * 优化递归
 * @param root
 * @returns
 */
function getMinimumDifference2(root: TreeNode | null): number {
  let pre = null
  let ans = Number.MAX_SAFE_INTEGER
  const traversal = (node: TreeNode) => {
    if (!node) return
    traversal(node.left)
    if (pre !== null) {
      ans = Math.min(ans, node.val - pre.val)
    }
    pre = node
    traversal(node.right)
  }
  traversal(root)

  return ans
}

function getMinimumDifference(root: TreeNode | null): number {
  let ans: number = Number.MAX_SAFE_INTEGER

  const stack: TreeNode[] = []

  let pre: TreeNode = null
  let cur: TreeNode = root
  while (cur || stack.length) {
    if (cur) {
      stack.push(cur)
      cur = cur.left
    } else {
      cur = stack.pop()
      if (pre) ans = Math.min(ans, cur.val - pre.val)
      pre = cur
      cur = cur.right
    }
  }

  return ans
}

export default getMinimumDifference
