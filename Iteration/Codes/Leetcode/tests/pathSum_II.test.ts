/*
 * Description: 437：路径总和 III
 * Url: https://leetcode.cn/problems/path-sum-iii/
 * Created: 2023-04-11 23:14:41
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import pathSum from "../pathSum_II";
describe("路径总和 III 测试", () => {
  it("pathSum function", () => {
    expect(pathSum([10, 5, -3, 3, 2, null, 11, 3, -2, null, 1], 8));
    expect(pathSum([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], 22));
  });
});
