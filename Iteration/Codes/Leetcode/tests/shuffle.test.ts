/*
 * Description: 384：打乱数组
 * Url: https://leetcode.cn/problems/shuffle-an-array/
 * Created: 2023-03-24 18:29:15
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-24 18:41:54
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import Solution from '../shuffleNums'
describe('打乱数组 测试', () => {
  it('undefined function', () => {
    const s = new Solution([1, 2, 3])

    console.log(s.shuffle())
    console.log(s.reset())
  })
})
