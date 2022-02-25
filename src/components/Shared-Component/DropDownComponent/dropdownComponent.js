import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  NativeSelect,
  Select
} from '@material-ui/core'
import React, { useState } from 'react'
import './dropdownComponent.css'

const DropdownComponent = (props) => {
  console.log(props?.name , "propsDropDown")
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
    dropdownList,
    disabled
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
        {/* <NativeSelect */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // defaultValue="Select"
          // defaultValue={inputValue}
          value={inputValue}
          // value={inputValue ? inputValue : "Select"}
          // error={!!error}
          disabled = {disabled}
          name={name}
          helperText={error ? error.message : null}
          onChange={(e) => onChange(e, name, null)}
          className='dropdown-options-style'
        >
           {dropdownList ? (dropdownList.map((eachVal) => (
            <MenuItem className='dropdown-options-style'  key={eachVal?.name || eachVal.key} value={eachVal?.name || eachVal.value}>{eachVal?.description || eachVal.value}</MenuItem>
          ))) :  (
            optionValues?.map((each) => (
            <MenuItem key={each || each.code} value={each || each.code}>
              {each || each.name}
            </MenuItem>
          )))
          } 
          </Select>
        {/* </NativeSelect> */}
      </FormControl>
    </div>
  )
}

export default DropdownComponent
