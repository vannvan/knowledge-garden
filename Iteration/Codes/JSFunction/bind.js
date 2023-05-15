Function.prototype.mybind = function (context, ...args) {
  // 不传默认是全局，window
  context = context || window
  // 把this存到fn，这里的this是调用的函数
  let fn = this
  function newFn(...fnArgs) {
    // 是不是通过new调用的
    const isNew = this instanceof newFn
    const thisArg = isNew ? this : Object(context)
    // 用call执行调用函数，绑定this的指向，并传递参数。返回执行结果
    return fn.call(thisArg, ...args, ...fnArgs)
  }
  newFn.prototype = Object.create(fn.prototype)
  return newFn
}

const obj = {
  name: 'bob',
}

function fn(a, b, c) {
  console.log(a, b, c)
}
fn.prototype.say = (word) => {
  console.log(word)
}

const fn1 = fn.mybind(obj)

fn1('a', 'b', 'c')

const Fn2 = fn.mybind(obj, 1, 2, 3)

let ins = new Fn2()

ins.say('hello world')
