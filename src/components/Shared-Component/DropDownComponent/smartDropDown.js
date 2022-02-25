import { FormControl, Grid, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React from 'react'

const SmartDropDown = (props) => {
  const {
    onSelectData,
    dropdownList,
    inputValue,
    label,
    placeholder,
    name,
    error,
    required,
    disabled,
  
  } = props
 console.log(inputValue , "inpit")

  return (
    <FormControl style={{ width: '113%', margin: '10px' }}>
      <Autocomplete
      
        disableClearable
        disabled = {disabled}
        options={dropdownList}
        getOptionLabel={(option) => option?.description}
        onChange={(e, value) => onSelectData(e, value, name)}
        value={inputValue || {}}
        defaultValue={inputValue}
        style={{ width: '80%' }}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{ ...params.inputProps }}
            label={
              error && (Object?.keys(inputValue || {})?.length === 0 ) ? (
                <span style={{ color: 'red' }}>{error?.message}</span>
              ) : required ? (
                <span className="required">{label}</span>
              ) : (
                label
              )
            }
            name={name}
            placeholder={placeholder}
            size="small"
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
      />
    </FormControl>
  )
}

export default SmartDropDown
