import beeAnimations from '../src/index.js'

beeAnimations({
  el: '.animate',
  animations: [
    {
      name: 'fadeOut',
      duration: 2,
      delay: 0,
      count: 1,
      callback: () => {
        console.log('es fadeOut')
      }
    },
    {
      name: 'bounceIn',
      duration: 2,
      delay: 0,
      count: 1,
      callback: () => {
        console.log('es bounceIn')
      }
    },
  ]
})
