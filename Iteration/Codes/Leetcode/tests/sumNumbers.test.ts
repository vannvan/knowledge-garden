/*
 * Description: 129：求根节点到叶节点数字之和
 * Url: https://leetcode.cn/problems/sum-root-to-leaf-numbers/
 * Created: 2023-05-02 21:48:17
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import sumNumbers from "../sumNumbers";
describe("求根节点到叶节点数字之和 测试", () => {
  it("sumNumbers function", () => {
    expect(sumNumbers([1, 2, 3]));
    expect(sumNumbers([4, 9, 0, 5, 1]));
  });
});
