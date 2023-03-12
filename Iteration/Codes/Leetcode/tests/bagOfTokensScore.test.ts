/*
 * Description: 985：令牌放置
 * Url: https://leetcode.cn/problems/bag-of-tokens/
 * Created: 2023-03-12 19:28:36
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import bagOfTokensScore from "../bagOfTokensScore";
describe("令牌放置 测试", () => {
  it("bagOfTokensScore function", () => {
    expect(bagOfTokensScore([100], 50));
    expect(bagOfTokensScore([100, 200], 150));
    expect(bagOfTokensScore([100, 200, 300, 400], 200));
  });
});
