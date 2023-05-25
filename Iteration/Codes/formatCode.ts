function generateParenthesis(n: number): string[] {
  const ans: string[] = []

  const path: string[] = []

  const dfs = (i: number, open: number) => {
    if (i == n * 2) {
      ans.push(path.join(''))
      return
    }

    if (open < n) {
      path[i] = '('
      dfs(i + 1, open + 1)
    }
    if (i - open < open) {
      path[i] = ')'
      dfs(i + 1, open)
    }
  }

  dfs(0, 0)

  return ans
}
