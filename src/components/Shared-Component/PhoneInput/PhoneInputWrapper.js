import { IconButton } from '@material-ui/core'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { TextInputUtils } from '../../../utils/textInputUtils'
import { SearchOutlined } from '@material-ui/icons';
import './phoneInputWrapper.css'
const PhoneInputWrapper = ({
  name,
  control,
  placeholder,
  label,
  errors,
  required = true,
  updateDialCode,
  handleChange,
  ...rest
}) => {
  const [dialCode, setDialCode] = useState('1')

  const updateState = (val) => {
    setDialCode(val)
    updateDialCode?.(val)
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required,
        validate: (value) => {
          if (required) {
            if (value) {
              return value !== dialCode
                ? TextInputUtils.isValidPhoneNumber(
                    value?.replace(dialCode, '')
                  )
                : false
            }
            return false
          }
          return true
        }
      }}
      render={({ field: { onChange, value } }) => (
        <div className="phone-input-wrapper">
          <PhoneInput
            id={name}
            control={control}
            name={name}
            value={value}
            inputProps={{}}
            placeholder={placeholder}
            country="us"
            onlyCountries={['us', 'in']}
            addInternationalOption={false}
            specialLabel={
              required && errors?.phoneNumber
                ? `${label} is required'`
                : label
            }
            onChange={(val, country) => {
              updateState(country?.dialCode)
              setTimeout(() => {
                onChange(val)
                handleChange?.(val.replace(dialCode, ''))
              }, 0)
            }}
            preserveOrder={['onlyCountries']}
            countryCodeEditable={false}
            containerClass={[
              'custom-react-tel',
              required && errors?.phoneNumber ? 'phone-input-error' : ''
            ].join(' ')}
            {...rest}
            // InputProps={{
            //   endAdornment: (
            //     <IconButton>
            //       <SearchOutlined color= 'red' />
            //     </IconButton>
            //   ),
            // }}
          />
        </div>
      )}
    />
  )
}

export default PhoneInputWrapper





// import { forwardRef,React } from 'react'
// import TextField from '@material-ui/core/TextField'
// import { makeStyles } from '@material-ui/core/styles'

// const useStyles = makeStyles(theme => ({
//   input: {
//     backgroundColor: '#fff'
//   }
// }))

// const phoneInput = (props, ref) => {
//   const classes = useStyles()

//   return (

//     <TextField
//       {...props}
//       InputProps={{
//         className: classes.input
//       }}
//       inputRef={ref}
//       fullWidth
//       size='small'
//       label='Phone Number'
//       variant='outlined'
//       name='phone'
//     />
//   )
// }
// export default forwardRef(phoneInput)
