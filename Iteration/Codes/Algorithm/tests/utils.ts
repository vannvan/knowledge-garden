/*
 * Description:
 * Created: 2023-02-21 23:12:30
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-21 23:28:35
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const randomUniqueNumber = (len: number, min?: number, max?: number) => {
  let _min = min || 0
  let _max = max || 100
  if (_min > _max) return []
  const hash: number[] = []
  while (hash.length < len) {
    const num = Math.floor(Math.random() * (_max - _min)) + _min
    console.log(num)
    if (!hash.includes(num)) {
      hash.push(num)
    }
  }
  return hash
}

/**
 * 生成指定范围的n个不重复数字
 * @param len 长度
 * @param min 最小值
 * @param max 最大值
 * @returns {
 *  sourceNumbers:number[] 源数组
 *  ascSortNumbers:number[]  升序数组
 *  descSortNumbers:number[] 降序数组
 * }
 */
export const genNumbers = (len: number, min?: number, max?: number) => {
  const numbers = randomUniqueNumber(len, min, max)
  return {
    sourceNumbers: numbers,
    ascSortNumbers: [...numbers].sort((a, b) => a - b),
    descSortNumbers: [...numbers].sort((a, b) => b - a),
  }
}
