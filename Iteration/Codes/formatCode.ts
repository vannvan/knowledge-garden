/*
 * Description: 用来转换代码格式
 * Created: 2023-03-31 21:25:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-23 23:06:17
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
var animals = [
  { species: 'Lion', name: 'King' },
  { species: 'Whale', name: 'Fail' },
]

for (var i = 0; i < animals.length; i++) {
  ;(function (i) {
    this.print = function () {
      console.log('#' + i + ' ' + this.species + ': ' + this.name)
    }
    this.print()
  }).call(animals[i], i)
}
