bee-animations
===
css3帧动画不仅功能强大，而且性能出色。遗憾的是只能单条使用，所以制作此库实现动画的列表调用

此库只提供帧动画的调用，你可以使用[`animate.css`](https://github.com/daneden/animate.css)动画库，也可自己定义


## 引入
- install

```bash
npm install bee-animations
# or
cnpm install bee-animations
# or
yarn add bee-animations
```

```javascript
import 'bee-animations'
```

- cdn

```html
<script src="https://unpkg.com/bee-animations"></script>
```

## 使用

```javascript
// BeeAnimations(el,options)

BeeAnimations('.animate', [{
    name: 'rotateIn',
    duration: 1,
    delay: 0,
    iteration: 1,
  },
  {
    name: 'lightSpeedOut',
    duration: 1,
    delay: 0,
    iteration: 1,
  }
])
```
## 参数
- `el`(css属性选择器)
- `options`(动画组)

| 属性        | 类型            | 解释                    |
| :-------- | :------------ | :-------------------- |
| name      | string        | 帧动画名称                 |
| duration  | number        | 动画持续时间                |
| delay     | number        | 动画延迟时间                |
| iteration | number/string | 动画重复次数，与标准`css`属性取值相同 |

## 案例
[example](https://codepen.io/dasoncheng/pen/KvWvgo)

## 更多
需要添加功能或者存在 `bug` 请提交 [`issues`](https://github.com/myour-cc/bee-animations/issues)，在空余时间会尽快处理。

