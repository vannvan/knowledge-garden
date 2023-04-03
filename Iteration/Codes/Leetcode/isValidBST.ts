/*
 * Description: 98：验证二叉搜索树
 * Url: https://leetcode.cn/problems/validate-binary-search-tree/
 * Tags: 树  深度优先搜索  二叉搜索树  二叉树
 * Created: 2023-04-03 21:26:37
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-03 22:15:20
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
 * 这个思路有陷阱
 * @param root
 * @returns
 */
function isValidBST1(root: TreeNode | null): boolean {
  // Think for yourself for 5 minutes...

  const dfs = (node: TreeNode) => {
    if (!node) return

    if (node.left && node.left.val >= node.val) {
      return false
    }

    if (node.right && node.right.val <= node.val) {
      return false
    }
    node.left && dfs(node.left)
    node.right && dfs(node.right)
    return true
  }

  return dfs(root)
}

/**
 * 常规递归法
 * @param root
 * @returns
 */
function isValidBST3(root: TreeNode | null): boolean {
  const helper = (root: TreeNode, lower: number, upper: number) => {
    if (root === null) {
      return true
    }
    if (root.val <= lower || root.val >= upper) {
      return false
    }
    return helper(root.left, lower, root.val) && helper(root.right, root.val, upper)
  }
  return helper(root, -Infinity, Infinity)
}

/**
 * 中序遍历递归法
 * @param root
 * @returns
 */
function isValidBST2(root: TreeNode | null): boolean {
  let pre = null
  const inOrder = (root: TreeNode) => {
    if (root === null) return true

    let left = inOrder(root.left)
    // 中序遍历，如果当前节点小于等于中序遍历的前一个节点，那么就不满足BST
    if (pre !== null && root.val <= pre.val) return false

    // 上面条件满足
    pre = root

    let right = inOrder(root.right)
    return left && right
  }
  return inOrder(root)
}

/**
 * 中序的迭代法
 * @param root
 * @returns
 */
function isValidBST(root: TreeNode | null): boolean {
  const stack: TreeNode[] = []
  let inOrder = -Infinity
  while (stack.length || root !== null) {
    while (root != null) {
      stack.push(root)
      root = root.left
    }

    root = stack.pop()
    if (root.val <= inOrder) {
      return false
    }

    inOrder = root.val
    root = root.right
  }

  return true
}

export default isValidBST
