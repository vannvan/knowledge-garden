/*
 * Description: 98：验证二叉搜索树
 * Url: https://leetcode.cn/problems/validate-binary-search-tree/
 * Created: 2023-04-03 21:26:37
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import isValidBST from "../isValidBST";
describe("验证二叉搜索树 测试", () => {
  it("isValidBST function", () => {
    expect(isValidBST([2, 1, 3]));
    expect(isValidBST([5, 1, 4, null, null, 3, 6]));
  });
});
