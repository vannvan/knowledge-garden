/*
 * Description: 907：爱吃香蕉的珂珂
 * Url: https://leetcode.cn/problems/koko-eating-bananas/
 * Created: 2023-03-27 22:54:48
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-27 23:19:27
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import minEatingSpeed from '../minEatingSpeed'
describe('爱吃香蕉的珂珂 测试', () => {
  it('minEatingSpeed function', () => {
    expect(minEatingSpeed([30, 11, 23, 4, 20], 5)).toEqual(30)
    expect(minEatingSpeed([3, 6, 7, 11], 8)).toEqual(4)
    expect(minEatingSpeed([30, 11, 23, 4, 20], 6)).toEqual(23)
  })
})
