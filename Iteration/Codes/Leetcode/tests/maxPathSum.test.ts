/*
 * Description: 124：二叉树中的最大路径和
 * Url: https://leetcode.cn/problems/binary-tree-maximum-path-sum/
 * Created: 2023-04-14 22:05:32
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import maxPathSum from "../maxPathSum";
describe("二叉树中的最大路径和 测试", () => {
  it("maxPathSum function", () => {
    expect(maxPathSum([1, 2, 3]));
    expect(maxPathSum([-10, 9, 20, null, null, 15, 7]));
  });
});
