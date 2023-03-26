// 从左向右，自上而下的调整节点
function maxHeapify(nums, i, heapSize) {
  let l = i * 2 + 1
  let r = i * 2 + 2
  let largest = i
  if (l < heapSize && nums[l] > nums[largest]) {
    largest = l
  }
  if (r < heapSize && nums[r] > nums[largest]) {
    largest = r
  }
  if (largest !== i) {
    swap(nums, i, largest) // 进行节点调整
    // 继续调整下面的非叶子节点
    maxHeapify(nums, largest, heapSize)
  }
}
function swap(a, i, j) {
  let temp = a[i]
  a[i] = a[j]
  a[j] = temp
}

const nums = [3, 2, 1, 5, 6, 4]

const res = buildMaxHeap(nums)

const k = 2

const heapSize = nums.length

// 自下而上构建一颗大顶堆
function buildMaxHeap(nums, heapSize) {
  for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
    maxHeapify(nums, i, heapSize)
  }
}

for (let i = nums.length - 1; i >= nums.length - k + 1; i--) {
  swap(nums, 0, i)
  --heapSize // 下沉后的元素不参与到大顶堆的调整
  // 重新调整大顶堆
  maxHeapify(nums, 0, heapSize)
}

console.log(nums)
