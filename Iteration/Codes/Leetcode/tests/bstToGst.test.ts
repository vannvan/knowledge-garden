/*
 * Description: 1114：从二叉搜索树到更大和树
 * Url: https://leetcode.cn/problems/binary-search-tree-to-greater-sum-tree/
 * Created: 2023-04-04 23:05:54
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import bstToGst from "../bstToGst";
describe("从二叉搜索树到更大和树 测试", () => {
  it("bstToGst function", () => {
    expect(
      bstToGst([4, 1, 6, 0, 2, 5, 7, null, null, null, 3, null, null, null, 8])
    );
    expect(bstToGst([0, null, 1]));
  });
});
