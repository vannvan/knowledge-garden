/**
 * 取所有子集
 */

const fn = (data) => {
  const result = []

  const len = data.length

  const subset = []

  const dfs = (nth) => {
    result.push([...subset])
    for (let i = nth; i < len; i++) {
      subset.push(data[i])
      dfs(i + 1)
      subset.pop()
    }
  }

  dfs(0)

  console.log('result', result)
}

const nums = [1, 2, 3]

fn(nums)
