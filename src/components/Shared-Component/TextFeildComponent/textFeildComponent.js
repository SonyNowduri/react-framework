import {
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  TextField
} from '@material-ui/core'
import editIcon from '../../../assets/images/editIcon.svg'
import React, { useEffect, useState } from 'react'
import { TextInputUtils } from '../../../utils/textInputUtils'

const TextFeildComponent = (props) => {
  const {
    name,
    label,
    inputValue,
    error,
    required,
    onChange,
    value,
    type,
    max,
    onInput,
    numberOfDigits,
    
  } = props
  const [editable, setEditable] = useState(false)

  


  const renderSwitch = (type, value) => {
    switch (type) {
      case 'number':
        // console.log(TextInputUtils.isValidPhoneNumber(value))
        return TextInputUtils.isValidPhoneNumber(value)
        // return TextInputUtils.isValidPhoneNumber(value)
      case 'email':
        // console.log(TextInputUtils.EMAIL)
        return TextInputUtils.EMAIL
      case 'zipcode':
        return TextInputUtils.fullNumbers
      default:
        return 'foo'
    }
  }

 
 

  return (
    <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
      <FormControl style={{ margin: '10px', width: '90%' }}>
        <InputLabel shrink htmlFor="standard-adornment-password">
          {error && !inputValue ? (
            <span style={{ color: 'red' }}>{error.message}</span>
          ) : required ? (
            <span className="required">{label}</span>
          ) : (
            label
          )
          }
        </InputLabel>
        <Input
          id={name}
          name={name}
          placeholder={error ? label : label}
          // defaultValue={inputValue}
          type={type ? type : 'text'}
          onInput={(e) => {
            type === 'number' ? e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, max) : ''
          }}
          pattern={renderSwitch(type, value)}
          // validate = {renderSwitch(type,value)}
          // onChange={(e) => onChange(e,name)}
          onChange={(e)=>onChange(e,name,value)}
          value={inputValue}
          // inputValue={inputValue}
          // error={!!error}
          // disabled={inputValue ? !editable : false}
          helperText={error ? error.message : null}
          // onInput={onInput}

          // onChange={(e) => }



          endAdornment={
            <InputAdornment position="end">
              <img
                src={editIcon}
                alt={editIcon}
                style={{ cursor: 'pointer' }}
                onClick={() => setEditable(!editable)}
              />
            </InputAdornment>
          }
        />
      </FormControl>
    </Grid>
  )
}

export default TextFeildComponent
