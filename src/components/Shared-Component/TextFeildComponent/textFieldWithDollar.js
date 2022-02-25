import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Grid
} from '@material-ui/core'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import { useForm } from 'react-hook-form'
import React from 'react'

const TextFeildWithDollar = (props) => {
  const { handleSubmit, reset, control } = useForm();
  const { type ,name, label, inputValue,error,handleChange,required,onChange,value,disabled } = props
  // console.log(name,label,)
  const handleInputChange = (e) => {
    console.log(e)
    handleChange(name, e)
  }

  

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <Grid style={{ marginRight: '7px', marginTop: '5px' }}>
        <FormControl fullWidth>
          <InputLabel shrink htmlFor="standard-adornment-password">
          {error ? <span style={{color:"red"}}>{error.message}</span> : required ? <span  className="required">{label}</span> : label}
          </InputLabel>
          <Input
            id="standard-adornment-password"
            placeholder={error ? label : label}
            value={inputValue}
            type={type ? type : 'text'}
            onChange={onChange}
            error={!!error}
            disabled={disabled}
            helperText={error ? error.message : null}
            // disabled={true}
            // onChange={(e) => handleInputChange(e.target.value)}
            // value={}
            endAdornment={
              <InputAdornment position="end">
                <AttachMoneyIcon
                  style={{ cursor: 'pointer', fontSize: 'medium' }}
                />
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default TextFeildWithDollar
