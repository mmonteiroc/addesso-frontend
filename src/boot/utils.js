import {Notify} from 'quasar'
import * as moment from 'moment';
import {saveAs} from 'file-saver';


export default ({Vue, router}) => {

  Vue.prototype.$notify = function (message, color, position = 'bottom-left') {
    Notify.create({
      message: message,
      color: color,
      position: position
    })
  }
  const parse = function (datetime) {
    return {
      year: moment(datetime).format("YYYY"),
      month: moment(datetime).format("MM"),
      day: moment(datetime).format("DD"),
      hour: moment(datetime).format("HH"),
      minute: moment(datetime).format("mm"),
      second: moment(datetime).format("ss"),
      toString: function () {
        return this.hour + ":" + this.minute + " - " + this.day + "/" + this.month + "/" + this.year
      }
    }
  }
  Vue.prototype.$parseDateTimeToObject = parse;
  Vue.prototype.$parseDateTimeToGoodString = function (string) {
    const obj = parse(string);
    return obj.toString()
  }

  const compareTime = function (aTime, bTime) {
    if (aTime.year !== bTime.year) return aTime.year < bTime.year ? -1 : 1
    if (aTime.month !== bTime.month) return aTime.month < bTime.month ? -1 : 1
    if (aTime.day !== bTime.day) return aTime.day < bTime.day ? -1 : 1
    if (aTime.hour !== bTime.hour) return aTime.hour < bTime.hour ? -1 : 1
    if (aTime.minute !== bTime.minute) return aTime.minute < bTime.minute ? -1 : 1
    if (aTime.second !== bTime.second) return aTime.second < bTime.second ? -1 : 1

    return 0
  }

  Vue.prototype.$sortTicketHistory = function (history) {
    return history.sort((a, b) => {
      const aTime = parse(a.statusUpdatedDate)
      const bTime = parse(b.statusUpdatedDate)
      return compareTime(aTime, bTime)
    })
  }

  Vue.prototype.$sortTicketsComments = function (tickets) {
    return tickets.sort((a, b) => {
      const aTime = parse(a.creationDate)
      const bTime = parse(b.creationDate)
      return compareTime(aTime, bTime)
    })
  }

  Vue.prototype.$saver = saveAs;


  Vue.prototype.$sortUserSessions = function (sessions) {
    return sessions.sort((a, b) => {
      const aTime = parse(a.lastConnection)
      const bTime = parse(b.lastConnection)
      return compareTime(aTime, bTime)
    })
  }
}
