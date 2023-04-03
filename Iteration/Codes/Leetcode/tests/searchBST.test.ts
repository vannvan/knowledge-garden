/*
 * Description: 783：二叉搜索树中的搜索
 * Url: https://leetcode.cn/problems/search-in-a-binary-search-tree/
 * Created: 2023-04-03 21:16:48
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import searchBST from "../searchBST";
describe("二叉搜索树中的搜索 测试", () => {
  it("searchBST function", () => {
    expect(searchBST([4, 2, 7, 1, 3], 2));
    expect(searchBST([4, 2, 7, 1, 3], 5));
  });
});
