/*
 * Description: 53：最大子数组和
 * Url: https://leetcode.cn/problems/maximum-subarray/
 * Tags: 数组  分治  动态规划
 * Created: 2023-03-10 23:26:56
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-10 23:27:53
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function maxSubArray(nums: number[]): number {
  let max = nums[0];
  let pre = 0;

  for (let i = 0; i < nums.length; i++) {
    pre = Math.max(pre + nums[i], nums[i]);
    max = Math.max(pre, max);
  }

  return max;
}
export default maxSubArray;
