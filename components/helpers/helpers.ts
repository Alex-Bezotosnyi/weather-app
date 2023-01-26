import moment from 'moment'

const convertDate = (unix: number): string => {
  return moment.unix(unix).format('DD.MM')
}

const convertTime = (unix: number): string => {
  return moment.unix(unix).format('HH:mm')
}

const selectBg = (data: string): string => {
  let result = 'https://cdn-icons-png.flaticon.com/512/3222/3222723.png'
  if (data === 'Clouds') {
    result = ('https://cdn-icons-png.flaticon.com/512/3222/3222801.png')
  } else if (data === 'Clear') {
    result = ('https://cdn-icons-png.flaticon.com/512/3222/3222675.png')
  } else if (data === 'Snow') {
    result = ('https://cdn-icons-png.flaticon.com/512/3222/3222717.png')
  } else if (data === 'Rain') {
    result = ('https://cdn-icons-png.flaticon.com/512/3222/3222681.png')
  } else {
    result = ('https://cdn-icons-png.flaticon.com/512/3222/3222723.png')
  }
  return result
}

export {
  convertDate,
  convertTime,
  selectBg
}
