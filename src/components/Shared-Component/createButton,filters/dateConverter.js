function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}
export function convertDate(str) {
    var date = new Date(str),
      month = ('0' + (date.getMonth() + 1)).slice(-2),
      longMonth = date.toLocaleString('en-us', { month: 'short' }),
      day = ('0' + date.getDate()).slice(-2),
      year = (date.getFullYear()),
      hours = addZero(date.getHours()),
      minutes = addZero(date.getMinutes())
    const newDate = [month,day,year].join('/')
    const newTime =  [hours,minutes].join(":")
    return [newDate, newTime].join(" ")
  }

  export function converDateForFilters(str) {
    if(str === ''){
      return null
    }
    
    var date = new Date(str),
    month = addZero(date.getMonth() + 1) ,
    day = addZero(date.getDate()),
    year = (date.getFullYear())

    return [year,month,day].join("-")
   
  }

  export function endDateForFilter(str) {
    if(str === ''){
      return null
    }
    var date = new Date(str),
    month = addZero(date.getMonth() + 1) ,
    day = addZero(date.getDate() + 10),
    year = (date.getFullYear())
    return [year,month,day].join("-")
  }