class Animates {
  constructor(el, animates) {
    this.el = document.querySelector(el)
    this.animates = animates
    this.count = animates.length
    this.sum = 0
    this.SetAnimate(this.animates[0])
    this.callback = () => {
      this.sum++;
      if (this.sum > this.count - 1) {
        this.unbind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', this.callback)
      } else {
        this.SetAnimate(this.animates[this.sum])
      }
    }
    this.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', this.callback)
  }
  SetAnimate(animate) {
    let style = {
      'animation-name': animate.name,
      'animation-duration': `${animate.duration}s`,
      'animation-delay': `${animate.delay}s`,
      'animation-iteration-count': animate.iteration
    }
    Object.keys(style).forEach((key) => {
      this.el.style[key] = style[key]
    })
  }
  on(events, callback) {
    events.split(' ').forEach((event) => {
      this.el.addEventListener(event, callback)
    })
  }
  unbind(events, callback) {
    events.split(' ').forEach((event) => {
      this.el.removeEventListener(event, callback)
    })
  }
}
window.BeeAnimations = (el, options) => {
  return new Animates(el, options)
}
