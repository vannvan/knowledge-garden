/*
 * Description: 135：分发糖果
 * Url: https://leetcode.cn/problems/candy/
 * Created: 2023-03-09 23:22:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-09 23:27:45
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import candy from '../candy'
describe('分发糖果 测试', () => {
  it('candy function', () => {
    expect(candy([1, 0, 2])).toEqual(5)
    expect(candy([1, 2, 2])).toEqual(4)
  })
})
