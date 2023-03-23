/*
 * Description: 187：重复的DNA序列
 * Url: https://leetcode.cn/problems/repeated-dna-sequences/
 * Created: 2023-03-23 23:34:13
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-24 00:05:44
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import findRepeatedDnaSequences from '../findRepeatedDnaSequences'
describe('重复的DNA序列 测试', () => {
  it('findRepeatedDnaSequences function', () => {
    expect(findRepeatedDnaSequences('AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT')).toEqual([
      'AAAAACCCCC',
      'CCCCCAAAAA',
    ])
    expect(findRepeatedDnaSequences('AAAAAAAAAAAAA')).toEqual(['AAAAAAAAAA'])
  })
})
