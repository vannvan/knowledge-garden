/*
 * Description: 左旋转字符串
 * Url: https://leetcode.cn/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/
 * Created: 2023-03-03 11:59:37
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 18:53:01
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import reverseLeftWords from '../reverseLeftWords'
describe('左旋转字符串 测试', () => {
  it('reverseLeftWords function', () => {
    reverseLeftWords('abcdefg', 2)
    // return
    expect(reverseLeftWords('abcdefg', 2)).toEqual('cdefgab')
    expect(reverseLeftWords('lrloseumgh', 6)).toEqual('umghlrlose')
  })
})
