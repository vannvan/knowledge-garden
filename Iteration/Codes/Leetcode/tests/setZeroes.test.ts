/*
 * Description: 73：矩阵置零
 * Url: https://leetcode.cn/problems/set-matrix-zeroes/
 * Created: 2023-04-22 23:21:34
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import setZeroes from "../setZeroes";
describe("矩阵置零 测试", () => {
  it("setZeroes function", () => {
    expect(
      setZeroes([
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
      ])
    );
    expect(
      setZeroes([
        [0, 1, 2, 0],
        [3, 4, 5, 2],
        [1, 3, 1, 5],
      ])
    );
  });
});
