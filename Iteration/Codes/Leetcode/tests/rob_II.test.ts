/*
 * Description: 337：打家劫舍 III
 * Url: https://leetcode.cn/problems/house-robber-iii/
 * Created: 2023-04-13 23:13:47
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import rob from "../rob_II";
describe("打家劫舍 III 测试", () => {
  it("rob function", () => {
    expect(rob([3, 2, 3, null, 3, null, 1]));
    expect(rob([3, 4, 5, 1, 3, null, 1]));
  });
});
