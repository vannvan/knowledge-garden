### reactCSS库

```js
class Component extends React.Component {
  render() {
    const styles = reactCSS({
      'default': {
        card: {
          background: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,.15)',
        },
        title: {
          fontSize: '2.8rem',
          color: this.props.color,
        },
      },
    })
    return (
      <div style={ styles.card }>
        <div style={ styles.title }>
          { this.props.title }
        </div>
        { this.props.children }
      </div>
    )
  }
}
```

### styled-components

```js
const Button = styled.a`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;
  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  ${props => props.primary && css`
    background: white;
    color: palevioletred;
  `}
`
render(
  <div>
    <Button
      href="https://github.com/styled-components/styled-components"
      target="_blank"
      rel="noopener"
      primary
    >
      GitHub
    </Button>
    <Button as={Link} href="/docs" prefetch>
      Documentation
    </Button>
  </div>
)

```

### css modules

利用webpack是class作用域为局部

配置 css-loader 的 options modules: true。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'css-loader',
        options: {
          modules: true,
        },
      },
    ],
  },
};
```

loader 会用唯一的标识符(identifier)来替换局部选择器。所选择的唯一标识符以模块形式暴露出去。

```js
options: {
  ...,
  modules: {
    mode: 'local',
    // 样式名规则配置
    localIdentName: '[name]__[local]--[hash:base64:5]',
  },
},
...
```

组件内

```js
...
import styles from "./App.css";
...
<div>
  <header className={styles["header__wrapper"]}>
    <h1 className={styles["title"]}>标题</h1>
    <div className={styles["sub-title"]}>描述</div>
  </header>
</div>
```

```js
.header__wrapper {
  text-align: center;
}

.title {
  color: gray;
  font-size: 34px;
  font-weight: bold;
}

.sub-title {
  color: green;
  font-size: 16px;
}
```

编译后

```css
.App__header__wrapper--TW7BP {
  text-align: center;
}

.App__title--2qYnk {
  color: gray;
  font-size: 34px;
  font-weight: bold;
}

.App__sub-title--3k88A {
  color: green;
  font-size: 16px;
}
```

