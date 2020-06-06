import {Notify} from 'quasar'

export default ({Vue}) => {
  Vue.prototype.$noti = {
    notify: function (message, color, position = 'bottom-left') {
      Notify.create({
        message: message,
        color: color,
        position: position
      })
    }
  }
  Vue.prototype.$notify = function (message, color, position = 'bottom-left') {
    Notify.create({
      message: message,
      color: color,
      position: position
    })
  }

}
