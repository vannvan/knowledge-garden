var search = function (nums, target) {
  let left = 0
  let right = nums.length - 1
  // 搜索区间为 [left, right]
  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2)
    console.log('mid', mid)
    if (nums[mid] < target) {
      // 搜索区间变为 [mid+1, right]
      left = mid + 1
    } else if (nums[mid] > target) {
      // 搜索区间变为 [left, mid-1]
      right = mid - 1
    } else if (nums[mid] == target) {
      // 收缩右侧边界
      right = mid - 1
    }
  }
  // 检查出界情况
  if (left >= nums.length || nums[left] != target) return -1
  return left
}

console.log(search([1, 2, 5, 4, 5, 6], 3))
