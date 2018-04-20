bee-animations
===

css3帧动画不仅功能强大，而且性能出色。遗憾的是没有提供动画序列，只能单条使用，于是制作此库实现动画的列表调用

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
import beeAnimations 'bee-animations'
```

- cdn

```html
<script src="https://unpkg.com/bee-animations@2.0.0/build/index.js"></script>
```

## 使用

```javascript
// beeAnimations(options)

beeAnimations(
    el: '.animate',
    animations: [
      {
          name: 'bounceIn',
          duration: 2,
          delay: 0,
          count: 1,
          callback: ()=>{
            console.log('es bounceIn')
          }
      },
      {
          name: 'fadeOut',
          duration: 2,
          delay: 0,
          count: 1,
          callback: ()=>{
            console.log('es fadeOut')
          }
      }
    ]
})
```
## 参数

** `?`表示可传参数

> options

| 属性        | 类型            | 解释                    |
| :-------- | :------------ | :-------------------- |
| el      | string|element        | 目标元素                 |
| animations  | array        | 动画队列                |
| only ?    | bool        | 是否忽视动画属性的次数并默认为1                |
| callback ?| function | 所有动画完成之后的回调|

> animations

| 属性        | 类型            | 解释                    |
| :-------- | :------------ | :-------------------- |
| name      | string        | 帧动画名称                 |
| duration  | number        | 动画持续时间                |
| delay     | number        | 动画延迟时间                |
| count | number | 0表示无限循环 |
| callback ?| function | 动画后的回调 |

## 案例

[example](https://codepen.io/dasoncheng/pen/pVJyyo)

## 更多

需要添加功能或者存在 `bug` 请提交 [`issues`](https://github.com/myour-cc/bee-animations/issues)，在空余时间会尽快处理。

