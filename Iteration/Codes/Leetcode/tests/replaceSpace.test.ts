/*
 * Description: 替换空格
 * Url: https://leetcode.cn/problems/ti-huan-kong-ge-lcof/
 * Created: 2023-03-02 19:19:13
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-02 19:19:54
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import replaceSpace from '../replaceSpace'
describe('替换空格 测试', () => {
  it('replaceSpace function', () => {
    expect(replaceSpace('We are happy.')).toEqual('We%20are%20happy.')
  })
})
