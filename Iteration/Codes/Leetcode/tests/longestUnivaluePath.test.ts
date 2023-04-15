/*
 * Description: 687：最长同值路径
 * Url: https://leetcode.cn/problems/longest-univalue-path/
 * Created: 2023-04-14 22:23:02
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import longestUnivaluePath from "../longestUnivaluePath";
describe("最长同值路径 测试", () => {
  it("longestUnivaluePath function", () => {
    expect(longestUnivaluePath([5, 4, 5, 1, 1, null, 5]));
    expect(longestUnivaluePath([1, 4, 5, 4, 4, null, 5]));
  });
});
