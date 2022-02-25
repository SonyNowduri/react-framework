import React, { useRef, useState } from 'react'
import './dateFilter.css'
import dateIcon from '../../../assets/images/adminIcons/dateIcon.svg'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import moment from 'moment'

export const DateFilter = () => {
  // const [inputValue, setInputValue] = useState(moment().format('MM/DD/YYYY'))
  const [selectedDate, setDate] = useState(moment('mm/dd/yyyy'))
  const [inputValue, setInputValue] = useState('')
  const [values, setValues] = useState({
    date: 'Date'
  })
  const hiddendate = useRef(null)


  const onDateChange = (date, value) => {
    setDate(date)
    setInputValue(value)
  }

  const dateFormatter = (str) => {
    return str
  }

  const handleClick = () => {
    hiddendate.current.click()
  }

  return (
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
      <KeyboardDatePicker
        id="Date"
        name="Date"
        autoOk={true}
        inputVariant="outlined"
        showTodayButton={true}
        initialFocusedDate={null}
        defaultValue={null}
        emptyLabel="Date"
        className="date-style"
        value={selectedDate}
        format="MM/DD/YYYY"
        size="small"
        helperText={''}
        // minDate={new Date()}
        inputValue={inputValue}
        onChange={onDateChange}
        // label="Date"
        // rifmFormatter={dateFormatter}
        label={!inputValue ? 'Date' : ''}
        error={!selectedDate ? true : false}
        // label={!dateError ? 'Appointment Date' : 'Appointment Date  is required'}
        // error={dateError ? true : false}
      />
    </MuiPickersUtilsProvider>
  )
}
