/*
 * Description: 下一个排列
 * Url: https://leetcode.cn/problems/next-permutation/
 * Created: 2023-03-08 15:14:16
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import nextPermutation from "../nextPermutation";
describe("下一个排列 测试", () => {
  it("nextPermutation function", () => {
    expect(nextPermutation([1, 2, 3]));
    expect(nextPermutation([3, 2, 1]));
    expect(nextPermutation([1, 1, 5]));
  });
});
