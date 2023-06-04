```js
class VNode {
    constructor(tagName, attrs, children) {
        this.tagName = tagName
        this.attributes = attrs
        this.children = children
    }

    render() {
        let element = document.createElement(this.tagName)
        Object.keys(this.attributes).forEach(key => {
            element.setAttribute(key, this.attributes[key])
        })

        this.children.forEach(child => {
            element.appendChild(child.render())
        })

        return element
    }
}

class TextNode {
    constructor(content) {
        this.content = content
    }

    render() {
        return document.createTextNode(this.content)
    }
}
```

usage

```js
let virtualDom = new VNode('div', {class: 'container'}, [
    new TextNode('some content'),
    new VNode('span', {}, [
        new TextNode('other content')
    ])
])
```

![](https://upload-images.jianshu.io/upload_images/7515763-98ebc0270dbf3f9e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/676/format/webp)

