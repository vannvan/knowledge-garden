/*
 * Description: 940：水果成篮
 * Url: https://leetcode.cn/problems/fruit-into-baskets/
 * Created: 2023-04-15 16:57:55
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-15 16:58:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import totalFruit from '../totalFruit'
describe('水果成篮 测试', () => {
  it('totalFruit function', () => {
    expect(totalFruit([1, 2, 1])).toEqual(3)
    expect(totalFruit([0, 1, 2, 2])).toEqual(3)
    expect(totalFruit([1, 2, 3, 2, 2])).toEqual(4)
  })
})
