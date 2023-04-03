/*
 * Description: 654：最大二叉树
 * Url: https://leetcode.cn/problems/maximum-binary-tree/
 * Tags: 栈  树  数组  分治  二叉树  单调栈
 * Created: 2023-04-03 20:28:42
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-03 20:51:24
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

function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
  // Think for yourself for 5 minutes...

  const traversal = (nums: number[], left: number, right: number) => {
    if (left > right) return null

    let max = left
    for (let i = left + 1; i <= right; i++) {
      if (nums[i] > nums[max]) {
        max = i
      }
    }
    const node = new TreeNode(nums[max])
    node.left = traversal(nums, left, max - 1)
    node.right = traversal(nums, max + 1, right)
    console.log(nums[max], node)
    return node
  }

  return traversal(nums, 0, nums.length - 1)
}
export default constructMaximumBinaryTree
