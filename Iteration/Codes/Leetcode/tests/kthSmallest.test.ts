/*
 * Description: 230：二叉搜索树中第K小的元素
 * Url: https://leetcode.cn/problems/kth-smallest-element-in-a-bst/
 * Created: 2023-05-03 22:34:19
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import kthSmallest from "../kthSmallest";
describe("二叉搜索树中第K小的元素 测试", () => {
  it("kthSmallest function", () => {
    expect(kthSmallest([3, 1, 4, null, 2], 1));
    expect(kthSmallest([5, 3, 6, 2, 4, null, null, 1], 3));
  });
});
