import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select
} from '@material-ui/core'
import React, { useState } from 'react'
import './dropdownComponent.css'

const SelectDropdown = (props) => {
  const {
    name,
    label,
    handleChange,
    optionValues,
    inputValue,
    width,
    error,
    required,
    onChange,
    dropdownList
  } = props

  const handleInputChange = (e) => {
    handleChange(name, e)
  }

  return (
    <div>
      <FormControl style={{ width: '90%', margin: '10px' }}>
        <InputLabel shrink id="demo-simple-select-label">
          {error && !inputValue ? (
            <span style={{ color: 'red' }}>{error.message}</span>
          ) : required ? (
            <span className="required">{label}</span>
          ) : (
            label
          )}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // defaultValue="Select"
          // defaultValue={inputValue}
          value={inputValue}
          // value={inputValue ? inputValue : "Select"}
          // error={!!error}
          name={name}
          helperText={error ? error.message : null}
          onChange={(e) => onChange(e, name, null)}

          // onChange={onChange}
        >
           {dropdownList?.map((each,index) => (
            <MenuItem key={index} value={each?.value}>
              {each?.label}
            </MenuItem>
          ))} 
         
        </Select>
      </FormControl>
    </div>
  )
}

export default SelectDropdown
