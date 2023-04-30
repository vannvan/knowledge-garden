/*
 * Description: 71：简化路径
 * Url: https://leetcode.cn/problems/simplify-path/
 * Created: 2023-04-30 22:01:18
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-30 22:18:29
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import simplifyPath from '../simplifyPath'
describe('简化路径 测试', () => {
  it('simplifyPath function', () => {
    expect(simplifyPath('/a//b////c/d//././/..')).toEqual('/a/b/c')
    expect(simplifyPath('/home/')).toEqual('/home')
    expect(simplifyPath('/../')).toEqual('/')
    expect(simplifyPath('/home//foo/')).toEqual('/home/foo')
    expect(simplifyPath('/a/./b/../../c/')).toEqual('/c')
  })
})
