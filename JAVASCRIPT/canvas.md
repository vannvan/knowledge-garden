- canvas自身是带的有width 和height的，写在标签属性style里面和外面是不一样的
- 在进行canvas路径操作的时候，一定要先清除前面的路径（obj.beginPath()），否则前面的路径会受到后面的影响。
-  obj.beginPath()和obj.closePath()两个没有关系，obj.beginPath()清除之前的路径；obj.closePath()闭合当前路径
- canvas画线操作：moveTo()、lineTo()、beginPath()、closePath()、stroke()、fill()
- canvas画矩形操作：rect()、strokeRect()、fillRect()、clearRect()
- canvas 做自适应可以用window.onresize
- canvas 的描边扩展的时候既向内又向外扩展
- canvas不会保存图形，所以图形画了就不能修改，如果要修改，只能删了重画；canvas画的图形没有事件，canvas对象本身有事件

- canvas画圆操作arc(cx,cy,r,startAng,endAng,false),cx、cy表示圆心坐标，r表示半径，startAng、endAng表示起始角度和结束角度（弧度制），最后一个参数false表示是否逆时针。

