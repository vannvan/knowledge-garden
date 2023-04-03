/*
 * Description: 530：二叉搜索树的最小绝对差
 * Url: https://leetcode.cn/problems/minimum-absolute-difference-in-bst/
 * Created: 2023-04-03 22:21:17
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import getMinimumDifference from "../getMinimumDifference";
describe("二叉搜索树的最小绝对差 测试", () => {
  it("getMinimumDifference function", () => {
    expect(getMinimumDifference([4, 2, 6, 1, 3]));
    expect(getMinimumDifference([1, 0, 48, null, null, 12, 49]));
  });
});
