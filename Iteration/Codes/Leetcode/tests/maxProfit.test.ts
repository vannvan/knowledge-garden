/*
 * Description: 买卖股票的最佳时机 测试
 * Created: 2023-02-28 22:26:50
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-28 23:09:13
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import maxProfit from "../maxProfit";

describe("买卖股票的最佳时机 测试", () => {
  it("maxProfit function", () => {
    maxProfit([7, 1, 5, 3, 6, 4]);
    expect(maxProfit([7, 1, 5, 3, 6, 4])).toEqual(5);
    expect(maxProfit([7, 1, 5, 3, 6, 4, 1, 8])).toEqual(7);
    expect(maxProfit([7, 6, 4, 3, 1])).toEqual(0);
  });
});
