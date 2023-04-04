/*
 * Description: 108：将有序数组转换为二叉搜索树
 * Url: https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/
 * Tags: 树  二叉搜索树  数组  分治  二叉树
 * Created: 2023-04-04 22:49:29
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-04 22:55:08
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import { TreeNode } from './utils/tree'

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

function sortedArrayToBST(nums: number[]): TreeNode | null {
  // Think for yourself for 5 minutes...
  // q1. 提供的数据是有序数组，要实现BST，那么倒推 数组就是BST中序遍历的结果
  // 中间的值为根节点，两边分别为左子树和右子树

  const traversal = (nums: number[], left: number, right: number) => {
    if (left > right) return null

    const mid = Math.floor(left + (right - left) / 2)
    const root = new TreeNode(nums[mid])
    root.left = traversal(nums, left, mid - 1)
    root.right = traversal(nums, mid + 1, right)

    return root
  }

  return traversal(nums, 0, nums.length - 1)
}
export default sortedArrayToBST
