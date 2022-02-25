import { IconButton, InputLabel } from '@material-ui/core'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { TextInputUtils } from '../../../utils/textInputUtils'
import { SearchOutlined } from '@material-ui/icons'
import './phoneInputWrapper.css'

const PhoneInputWrapperWithController = (props) => {
  const {
    name,
    control,
    placeholder,
    label,
    error,
    required,
    updateDialCode,
    handleChange,
    onChange,
    inputValue,
    handleInputChange,
    ...rest
   } = props

  const [dialCode, setDialCode] = useState('1')

  const updateState = (val=1) => {
    console.log(val)
    setDialCode(val)
    
  }

  
  return (
    <div className="phone-input-wrapper">
      <PhoneInput
        id={name}
        control={control}
        name={name}
        value={inputValue}
        inputProps={{}}
        placeholder={placeholder}
        country="us"
        onlyCountries={['us', 'in']}
        addInternationalOption={false}
        specialLabel={
          error && !inputValue || (error && inputValue === dialCode )? (
            <span style={{ color: 'red' }}>{error?.message}</span>
          ) : required ? (
            <span className="required">{label}</span>
          ) : (
            label
          )
        }
        onChange={(val, country, e) => {
          console.log(country,"country")
          setTimeout(() => {
            updateState(country?.dialCode)
            onChange?.(val,name,country)
          }, 0)
        
        }}
        preserveOrder={['onlyCountries']}
        countryCodeEditable={false}
        containerClass={[
          'custom-react-tel',
          required && error?.phoneNumber ? 'phone-input-error' : ''
        ].join(' ')}
        {...rest}
      />
    </div>
  )
}

export default PhoneInputWrapperWithController
