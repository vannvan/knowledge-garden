/*
 * Description: 784：二叉搜索树中的插入操作
 * Url: https://leetcode.cn/problems/insert-into-a-binary-search-tree/
 * Created: 2023-04-04 21:59:01
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import insertIntoBST from "../insertIntoBST";
describe("二叉搜索树中的插入操作 测试", () => {
  it("insertIntoBST function", () => {
    expect(insertIntoBST([4, 2, 7, 1, 3], 5));
    expect(insertIntoBST([40, 20, 60, 10, 30, 50, 70], 25));
    expect(
      insertIntoBST([4, 2, 7, 1, 3, null, null, null, null, null, null], 5)
    );
  });
});
