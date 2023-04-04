/*
 * Description: 501：二叉搜索树中的众数
 * Url: https://leetcode.cn/problems/find-mode-in-binary-search-tree/
 * Created: 2023-04-04 15:12:09
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import findMode from "../findMode";
describe("二叉搜索树中的众数 测试", () => {
  it("findMode function", () => {
    expect(findMode([1, null, 2, 2]));
    expect(findMode([0]));
  });
});
