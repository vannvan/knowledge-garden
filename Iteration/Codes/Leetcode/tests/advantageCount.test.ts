/*
 * Description: 901：优势洗牌
 * Url: https://leetcode.cn/problems/advantage-shuffle/
 * Created: 2023-03-28 21:03:53
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-28 21:04:19
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import advantageCount from '../advantageCount'
describe('优势洗牌 测试', () => {
  it('advantageCount function', () => {
    expect(advantageCount([2, 7, 11, 15], [1, 10, 4, 11])).toEqual([2, 11, 7, 15])
    expect(advantageCount([12, 24, 8, 32], [13, 25, 32, 11])).toEqual([24, 32, 8, 12])
  })
})
