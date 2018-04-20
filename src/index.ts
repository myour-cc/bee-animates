interface Ianimation {
  name: string
  duration: number
  delay: number
  count: number
  callback?: Function | null
}
interface Ioptions {
  el: string | Element
  animations: Ianimation[]
  only?: boolean,
  callback?: Function
}


class Animate {
  private el: Element
  private animations: Ianimation[]
  private only: boolean
  private callback: Function
  private count: number
  private current: number
  private animating: boolean

  constructor(options: Ioptions) {
    options = Object.assign({
      el: '',
      animations: [],
      only: false,
      callback: () => {
        this.el.style.animation = ''
      }
    }, options)

    if ('[object HTMLDivElement]' != Object.prototype.toString.call(options.el)) {
      const els = document.querySelectorAll(options.el as string)
      if (els.length != 1) {
        throw `请传入唯一 el`
      } else {
        this.el = els[0] as Element
      }
    } else {
      this.el = options.el as Element
    }
    if (options.animations.length < 1) {
      throw `动画种类至少为一种`
    }
    this.animations = options.animations
    this.only = options.only as boolean
    this.callback = options.callback as Function
    this.count = options.animations.length
    this.current = 0
    this.animating = true

    this.begin()
  }
  private setAnimate() {
    const animate = this.animations[this.current]
    this.current++
    const style = {
      'animation-name': animate.name,
      'animation-duration': `${animate.duration}s`,
      'animation-delay': `${animate.delay}s`,
      'animation-iteration-count': this.only ? 1 : animate.count === 0 ? 'infinite' : animate.count
    }
    Object.keys(style).forEach(key => {
      this.el.style[key] = style[key]
    })
  }
  private on(events: string, callback: any) {
    events.split(' ').forEach(event => {
      this.el.addEventListener(event, callback)
    })
  }
  private unbind(events: string, callback: any) {
    events.split(' ').forEach(event => {
      this.el.removeEventListener(event, callback)
    })
  }
  private doCallback() {
    const callback = this.animations[this.current - 1].callback as Function
    if ('[object Function]' === Object.prototype.toString.call(callback)) {
      callback()
    }
  }
  private begin() {
    const listenAnimate = () => {
      if (!this.animating) {
        this.unbind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', this.begin)
        return
      }

      if (this.current <= 0) {
        // 初始动画
        this.setAnimate()
        this.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', listenAnimate)
      } else if (this.current <= (this.count - 1)) {
        // 动画回调
        this.doCallback()
        // 后续动画
        this.setAnimate()
        this.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', listenAnimate)

      } else {
        // 动画回调
        this.doCallback()
        // 所有动画完成
        this.unbind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', listenAnimate)
        if (this.callback)
          this.callback(this)
      }
    }
    listenAnimate()
  }
  public stop() {
    this.animating = false
    this.el.style.animation = ''
  }
}

export default (options: Ioptions) => {
  return new Animate(options)
}
// window.beeAnimations = (options: Ioptions) => {
//   return new Animate(options)
// }
// (() => {

// })()
