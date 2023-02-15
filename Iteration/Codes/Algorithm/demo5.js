/**
 * 全排列
 */

const fn = (data) => {
  const len = data.length

  const visited = {}

  const curr = []
  //
  const results = []

  const dfs = (nth) => {
    if (len === nth) {
      // 说明用完数字了
      // console.log('curr', curr)
      results.push([...curr])
      // results.push(curr.slice())
      return
    }

    for (let i = 0; i < len; i++) {
      if (!visited[data[i]]) {
        visited[data[i]] = true

        curr.push(data[i])

        dfs(nth + 1)

        curr.pop() //让出坑位

        visited[data[i]] = false
      }
    }
  }

  dfs(0)

  console.log('results', results)
}

const nums = [1, 2, 3]

fn(nums)
