import {
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  TextField
} from '@material-ui/core'
import editIcon from '../../../assets/images/editIcon.svg'
import { Controller, useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { TextInputUtils } from '../../../utils/textInputUtils'
// import { ErrorMessage } from '@hookform/error-message';

const TextFeildComponentWithController = (props) => {
  const { handleSubmit, reset, control } = useForm()
  const {
    name,
    label,
    inputValue,
    error,
    handleChange,
    required,
    onChange,
    value,
    type,
    validate
  } = props
  const [editable, setEditable] = useState(false)
  const [inputValueData, setInputValueData] = useState(inputValue)

  console.log(error)

  const renderSwitch = (type, value) => {
    // console.log(type)
    switch (type) {
      case 'tel':
        return TextInputUtils.isValidPhoneNumber(value)
      case 'email':
        return TextInputUtils.EMAIL
      default:
        return 'foo'
    }
  }

  const handleInputChange = (e) => {
    console.log(e)
    handleChange(name, e)
  }

  const handleClickEditable = () => {
    console.log('Edit')
    setEditable(!editable)
  }

  return (
    <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
      <Controller
        name={'zipCode'}
        control={control}
        rules={{
          minLength: {
            value: 5,
            message: 'Zip Code should be atleast 5'
          },
          pattern: {
            value: /^[1-9]\d*(\d+)?$/i,
            message: 'Please enter an integer'
          }
        }}
        render={({
          field: { onChange, value, name, ref },
          fieldState: { error }
        }) => (
          <FormControl style={{ margin: '10px', width: '90%' }}>
            <InputLabel shrink htmlFor="standard-adornment-password">
              {error ? (
                <span style={{ color: 'red' }}>{error.message}</span>
              ) : required ? (
                <span className="required">{label}</span>
              ) : (
                label
              )}
            </InputLabel>
            <Input
              id={name}
              placeholder={error ? label : label}
              defaultValue={inputValue}
              type={type ? type : 'text'}
              pattern={renderSwitch(type, value)}
              // validate = {renderSwitch(type,value)}
              handleChange={(e) => handleInputChange(e.target.value)}
              onChange={onChange}
              // value={value}
              error={!!error}
              disabled={inputValue ? !editable : false}
              helperText={error ? error.message : null}
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
        )}
      />
    </Grid>
  )
}

export default TextFeildComponentWithController
