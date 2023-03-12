/*
 * Description: 1329：玩筹码
 * Url: https://leetcode.cn/problems/minimum-cost-to-move-chips-to-the-same-position/
 * Created: 2023-03-12 17:31:21
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import minCostToMoveChips from "../minCostToMoveChips";
describe("玩筹码 测试", () => {
  it("minCostToMoveChips function", () => {
    expect(minCostToMoveChips([1, 2, 3]));
    expect(minCostToMoveChips([2, 2, 2, 3, 3]));
    expect(minCostToMoveChips([1, 1000000000]));
  });
});
