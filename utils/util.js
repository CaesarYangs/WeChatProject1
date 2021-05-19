const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// function doTap() {
//   const selectedDay = this.calendar.getSelectedDay();
//   var day;
//   var mon;
//   var year;
//   day = selectedDay[0].day;
//   mon = selectedDay[0].month;
//   year = selectedDay[0].year;
//   // this.setData({
//   //   nowSelectedDate: day,
//   //   nowSelectedMonth: mon,
//   //   nowSelectedYear: year
//   // })
 
//   // console.log(this.data.nowSelectedDate)
//   // console.log(this.data.nowSelectedMonth)
//   // console.log(this.data.nowSelectedYear)
  
//   // calendar.jump({year:2018, month:6, date:6})
// }

module.exports = {
  formatTime
}
