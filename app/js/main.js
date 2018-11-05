var info = document.querySelector('.info')
var t_one_x, t_one_y, t_two_x, t_two_y
var width, height, type, target
target = document.querySelector('.target')
target.querySelector('img').src = '../tu/640960.jpg'

function adjustDirection(type, touch) {
  var t_one, t_two
  switch (type) {
    case 'vertical':
      if(touch[0].clientY < touch[1].clientY) {
        t_one = touch[0]
        t_two = touch[1]
      } else {
        t_one = touch[1]
        t_two = touch[0]
      }
      break
    case 'horizital':
      if(touch[0].clientX < touch[1].clientX) {
        t_one = touch[0]
        t_two = touch[1]
      } else {
        t_one = touch[1]
        t_two = touch[0]
      }
      break
    case 'all':
      if(touch[0].clientY < touch[1].clientY) {
        t_one = touch[0]
        t_two = touch[1]
      } else {
        t_one = touch[1]
        t_two = touch[0]
      }
      break
    default:
      break
  }
  return {
    one: t_one,
    two: t_two
  }
}
document.addEventListener('touchstart', function(e) {
  var touch = e.targetTouches
  if(!e.target.parentNode.classList.contains('target')) {
    return
  }
  if(e.targetTouches.length == 2) {
    if(Math.abs(t_one_x - t_two_x) < 50) {
      type = 'vertical'
    } else if(Math.abs(t_one_y - t_two_y) < 50) {
      type = 'horizital'
    } else {
      type = 'all'
    }
    var t = adjustDirection(type, touch)
    var t_one = t.one
    var t_two = t.two
    t_one_x = t_one.clientX
    t_one_y = t_one.clientY
    t_two_x = t_two.clientX
    t_two_y = t_two.clientY
    width = target.offsetWidth
    height = target.offsetHeight
  }
})
document.addEventListener('touchmove', function(e) {
  if(e.targetTouches.length == 2) {
    e.preventDefault()
    var touch = e.targetTouches
    var t_one, t_two
    var t = adjustDirection(type, touch)
    t_one = t.one
    t_two = t.two
    var x_one = t_one.clientX - t_one_x
    var y_one = t_one.clientY - t_one_y
    var x_two = t_two.clientX - t_two_x
    var y_two = t_two.clientY - t_two_y
    info.innerHTML = t_one.clientX
    switch (type) {
      case 'vertical':
        if(t_one.clientY > t_two.clientY) {
          return
        }
        target.style.height = height - y_one + y_two + 'px'
        target.style.webkitTransform = `translateY(${y_one}px)`
        break
      case 'horizital':
        if(t_one.clientX > t_two.clientX) {
          return
        }
        info.innerHTML = x_one + ',' + x_two + ',' + target.style.width
        target.style.width = width - x_one + x_two + 'px'
        //target.style.webkitTransform = `translateX(${x_one}px)`
        break
      case 'all':
        if(t_one.clientY > t_two.clientY) {
          return
        }
        target.style.width = width + x_one - x_two + 'px'
        target.style.height = height - y_one + y_two + 'px'
        //target.style.webkitTransform = `translate3d(${x_one}px,${y_one}px,0)`
        target.style.webkitTransform = `translateY(${y_one}px)`
        break
      default:
        break
    }
  }
}, {
  passive: false
})
//1.5,1 ,2 1.428,1.2,1.6,0.67,2.33,1.78,6.67,3.2,0.75
document.addEventListener('touchend', function(e) {
  if(e.targetTouches.length == 2 && e.target.parentNode.classList.contains('target')) {
    var this_width = target.offsetWidth
    var this_height = target.offsetHeight
    var rate = this_width / this_height
    var range
    if(rate < 0.7) {
      range = '640960'
    } else if(rate >= 0.7 && rate < 0.95) {
      range = '7501000'
    } else if(rate >= 0.95 && rate < 1.1) {
      range = '500500'
    } else if(rate >= 1.1 && rate < 1.3) {
      range = '600500'
    } else if(rate >= 1.3 && rate < 1.45) {
      range = '600420'
    } else if(rate >= 1.45 && rate < 1.55) {
      range = '480320'
    } else if(rate >= 1.55 && rate < 1.65) {
      range = '640400'
    } else if(rate > 1.65 && rate < 1.9) {
      range = '720405'
    } else if(rate >= 1.9 && rate < 2.15) {
      range = '600300'
    } else if(rate >= 2.15 && rate < 2.8) {
      range = '700300'
    } else if(rate >= 2.8 && rate < 4.5) {
      range = '960300'
    } else {
      range = '800120'
    }
    var imgurl = `../tu/${range}.jpg`
    if(range === '500500' || range === '800120') {
      imgurl = `../tu/${range}.png`
    }
    target.querySelector('img').src = imgurl
    target.transiton
  }
})
