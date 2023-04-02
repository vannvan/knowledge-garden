/*
 * Description: 113：路径总和 II
 * Url: https://leetcode.cn/problems/path-sum-ii/
 * Created: 2023-04-02 18:34:25
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import pathSum from "../pathSum";
describe("路径总和 II 测试", () => {
  it("pathSum function", () => {
    expect(pathSum([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], 22));
    expect(pathSum([1, 2, 3], 5));
    expect(pathSum([1, 2], 0));
  });
});
