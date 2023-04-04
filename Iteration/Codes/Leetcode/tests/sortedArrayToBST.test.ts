/*
 * Description: 108：将有序数组转换为二叉搜索树
 * Url: https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/
 * Created: 2023-04-04 22:49:29
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import sortedArrayToBST from "../sortedArrayToBST";
describe("将有序数组转换为二叉搜索树 测试", () => {
  it("sortedArrayToBST function", () => {
    expect(sortedArrayToBST([-10, -3, 0, 5, 9]));
    expect(sortedArrayToBST([1, 3]));
  });
});
