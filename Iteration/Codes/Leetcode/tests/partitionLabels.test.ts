/*
 * Description: 768：划分字母区间
 * Url: https://leetcode.cn/problems/partition-labels/
 * Created: 2023-03-11 19:10:17
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 19:35:53
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import partitionLabels from '../partitionLabels'
describe('划分字母区间 测试', () => {
  it('partitionLabels function', () => {
    partitionLabels('ababcbacadefegdehijhklij')
    expect(partitionLabels('ababcbacadefegdehijhklij')).toEqual([9, 7, 8])
    expect(partitionLabels('eccbbbbdec')).toEqual([10])
  })
})
