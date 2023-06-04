```js
;
(function() {

    var jQuery = function(selected) {

        return new jQuery.prototype.init(selected); //返回一个对象
    };

    var markArray = function(arr, that) {

        var brr = that;
        for (var i = 0; i < arr.length; i++) {

            brr[i] = arr[i]

        }
        brr.length = arr.length;
        return brr;
    };

    jQuery.prototype = {

        init: function(selected) {
            //这是一个方法===》选择元素的

            var dom = null;

            if (typeof selected != "string") {

                dom = [selected];

            } else {
                dom = document.querySelectorAll(selected);
            }

            return markArray(dom, this); //返回一个对象

        },
        hover: function(over, out) {

            this[0].onmouseover = over;
            this[0].onmouseout = out;
            return this;

        },
        css: function(attr, val) {
            for (var i = 0; i < this.length; i++) {
                this[i].style[attr] = val;
            }
            return this;
        },
        html: function(val) {
            for (var i = 0; i < this.length; i++) {
                this[i].innerHTML = val;
            }
            return this;
        },
        first: function() {

            return $(this[0]);
        },
        last: function() {

            return $(this[this.length - 1]);
        },
        eq: function(num) {

            return $(this[num]);

        }

    };

    jQuery.prototype.init.prototype = jQuery.prototype;

    window.jQuery = window.$ = jQuery;


})();
```

use

```js
 $("#box").hover(function() {

     alert('鼠标移入');

 }, function() {

     alert("鼠标移出");

 })

        $("#box").css("background", "red");


        $("ul li").first().css("background", "red");
        $("ul li").last().css("background", "red");
        $("ul li").eq(2).css("background", "blue");
```

