/*
 * Description: 146：LRU 缓存
 * Url: https://leetcode.cn/problems/lru-cache/
 * Created: 2023-05-10 23:06:40
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-10 23:54:32
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import { LRUCache, LRUCacheByLink } from '../LRUCache'
describe('LRU 缓存 测试', () => {
  it('LRUCache class', () => {
    const lru = new LRUCache(2)
    lru.put(1, 1)
    lru.put(2, 2)
    expect(lru.get(1)).toEqual(1)
    lru.put(3, 3)
    expect(lru.get(2)).toEqual(-1)
    lru.put(4, 4)
    expect(lru.get(1)).toEqual(-1)
    expect(lru.get(3)).toEqual(3)
    expect(lru.get(4)).toEqual(4)
  })

  it('LRUCacheByLink class', () => {
    const lru = new LRUCacheByLink(2)
    lru.put(1, 1)
    lru.put(2, 2)
    expect(lru.get(1)).toEqual(1)
    lru.put(3, 3)
    expect(lru.get(2)).toEqual(-1)
    lru.put(4, 4)
    expect(lru.get(1)).toEqual(-1)
    expect(lru.get(3)).toEqual(3)
    expect(lru.get(4)).toEqual(4)
  })
})
