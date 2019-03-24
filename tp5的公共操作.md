### 1、公共操作有什么用？如何创建公共操作？

```
class Index
{
  protected $lesson; //定义一个变量
  public function __construct($lesson='thinkphp5') //使用构造函数来初始化$lesson
  {
    $this->lesson = $lesson;
  }
  public function demo1() 
  {
    return (new self('php中文网www.php.cn))->lesson; //new self()实例化了一个新对象并把新内容给了$lesson，又用->lesson指向了对象中的$lesson变量，return这个新值
  }
  public function demo2()
  {
    return $this->lesson; //返回当前对象中$lesson的值，构造函数
  }
}
```

如果当前的控制器继承自基类Controller，因为在Controller中有一个初始化的方法。
 我们可以在当前Index控制器类中继承Controller类，然后重写这个初始化的方法_initialize()就可以了。

```
<?php
namespace app\index\controller;
use think\Controller;
class Index extends Controller
{
  protected $lesson;
  public function _initialize($lesson='thinkphp5')
  {
    $this->lesson = $lesson;
  }
/***************注意下方的改变****************/
  public function demo1()
  {
    $this->_initialize('欢迎来到php中文网学习');
    return $this->lesson;
  }
/********************************************/
  public function demo2()
  {
    return $this->lesson;
  }
}
?>
```

如果有多个控制器需要共享一些操作应该怎么做呢？
 参照数据共享的方法，可以创建一个公共控制器类。

### 2、公共控制器类有什么用？如何创建公共控制器？

> 创建了公共控制器类后，让这个公共类继承自基类Controller，然后把一些公共操作写到这个公共类中，以后我们创建的控制器只要继承这个公共类就可以，不用直接继承基类Controller了。

如何实现呢？
 在app\index\controller文件夹下新建Base.php文件，内容：

```
<?php
namespace app\index\controller;
class Base extends \think\Controller
{
  protected $siteName = 'PHP中文网';
  protected function test()
  {
    return '欢迎来到'.$this->siteName.'学习thinkphp5开发技术';
  }
}
?>
```

index.php文件中的内容：

```
<?php
namespace app\index\controller;
class Index extends \app\index\controller\Base
{
  public function demo()
  {
    return $this->siteName;
  }
  public function demo1()
  {
    return $this->test();
  }
}
?>
```

