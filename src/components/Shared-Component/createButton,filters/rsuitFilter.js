import { Grid } from '@material-ui/core';
import React from 'react';
import { DateRangePicker } from 'rsuite';
import { addDays } from 'date-fns'
import { converDateForFilters , convertDate } from './dateConverter';

 const DateFilterSearch = (props) =>{
     const {onDateSearch} = props
     const [dateValue, setDateValue] = React.useState([
        // new Date(),
        // addDays(new Date(), 10)
      ])
    

    const datechangeHandler = (e) => {
        console.log(e , 'eventDate')
        // let startDate = converDateForFilters(e[0])
        // let endDate = converDateForFilters(e[1])
        // console.log(startDate , endDate , "startDateEndDate")
        onDateSearch(e)
        setDateValue(e)
        
    }

  return (
      <Grid>
    <DateRangePicker character = {" - "} format="MM/dd/yyyy"   size="sm" cleanable={false}  value={dateValue}  style={{ width: 180 }}  onChange={(e) => datechangeHandler(e)} />
    </Grid>
  );
}

export default DateFilterSearch