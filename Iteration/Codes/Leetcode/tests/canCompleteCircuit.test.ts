/*
 * Description: 134：加油站
 * Url: https://leetcode.cn/problems/gas-station/
 * Created: 2023-03-11 15:17:58
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 15:18:30
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import canCompleteCircuit from '../canCompleteCircuit'
describe('加油站 测试', () => {
  it('canCompleteCircuit function', () => {
    expect(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])).toEqual(3)
    expect(canCompleteCircuit([2, 3, 4], [3, 4, 3])).toEqual(-1)
  })
})
