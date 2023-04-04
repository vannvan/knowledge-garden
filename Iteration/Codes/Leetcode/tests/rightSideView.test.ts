/*
 * Description: 199：二叉树的右视图
 * Url: https://leetcode.cn/problems/binary-tree-right-side-view/
 * Created: 2023-04-05 00:05:23
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import rightSideView from "../rightSideView";
describe("二叉树的右视图 测试", () => {
  it("rightSideView function", () => {
    expect(rightSideView([1, 2, 3, null, 5, null, 4]));
    expect(rightSideView([1, null, 3]));
    expect(rightSideView([]));
  });
});
