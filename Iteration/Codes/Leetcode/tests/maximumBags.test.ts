/*
 * Description: 2366：装满石头的背包的最大数量
 * Url: https://leetcode.cn/problems/maximum-bags-with-full-capacity-of-rocks/
 * Created: 2023-03-15 19:25:53
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-15 19:43:57
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import maximumBags from '../maximumBags'
describe('装满石头的背包的最大数量 测试', () => {
  it('maximumBags function', () => {
    maximumBags([2, 3, 4, 5], [1, 2, 4, 4], 2)
    expect(maximumBags([2, 3, 4, 5], [1, 2, 4, 4], 2)).toEqual(3)
    expect(maximumBags([10, 2, 2], [2, 2, 0], 100)).toEqual(3)
  })
})
