/*
 * Description: 75：颜色分类
 * Url: https://leetcode.cn/problems/sort-colors/
 * Created: 2023-03-15 22:45:43
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-15 22:58:25
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import sortColors from '../sortColors'
describe('颜色分类 测试', () => {
  it('sortColors function', () => {
    sortColors([2, 0, 2, 1, 1, 0])
    expect(sortColors([2, 0, 2, 1, 1, 0])).toEqual([0, 0, 1, 1, 2, 2])
    expect(sortColors([2, 0, 1])).toEqual([0, 1, 2])
  })
})
