import React from 'react'
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'

const CustomDropDown = (props) => {
  const { name, label, handleChange, optionValues, inputValue, width,error,required,onChange } = props

  const handleInputChange = (e) => {
    // console.log(e)
    handleChange(name, e)
  }

  return (
    <Grid item xs={12} sm={12} lg={12} xl={12} md={12}>
      <Grid style={{ marginRight: '7px', marginTop: '5px' }}>
        <FormControl fullWidth>
          <InputLabel shrink id="demo-simple-select-label">
          {error ? <span style={{color:"red"}}>{error.message}</span> : required ? <span  className="required">{label}</span> : label}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue="Select"
            value={inputValue}
            error={!!error}
            helperText={error ? error.message : null}
            onChange={onChange}
            // disabled={true}
            // value={age}
            // onChange={(e) => handleInputChange(e?.target?.value)}
          >
            {optionValues?.map((each) => (
              <MenuItem key={each} value={each}>
                {each}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default CustomDropDown

