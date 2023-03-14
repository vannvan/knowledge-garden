/*
 * Description: 747：使用最小花费爬楼梯
 * Url: https://leetcode.cn/problems/min-cost-climbing-stairs/
 * Created: 2023-03-14 22:06:34
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-14 22:07:16
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import minCostClimbingStairs from '../minCostClimbingStairs'
describe('使用最小花费爬楼梯 测试', () => {
  it('minCostClimbingStairs function', () => {
    expect(minCostClimbingStairs([10, 15, 20])).toEqual(15)
    expect(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])).toEqual(6)
  })
})
