import {
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  TextField
} from '@material-ui/core'
import editIcon from '../../../assets/images/editIcon.svg'
import { useForm } from 'react-hook-form'
import React from 'react'

const CustomInput = (props) => {
  const { handleSubmit, reset, control } = useForm();
  const { name, label, inputValue,error,handleChange,required,onChange,value , type, disabled=false} = props
 
 
  const handleInputChange = (e) => {
    console.log(e)
    handleChange(name, e)
  }



  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <FormControl style={{ margin: '10px', width: '50%' }}>
        <InputLabel shrink htmlFor="standard-adornment-password">
        {error ? <span style={{color:"red"}}>{error.message}</span> : required ? <span  className="required">{label}</span> : label }
        </InputLabel>
        <Input
          id={name}
          name={name}
          placeholder={error ? label : label}
          value={inputValue}
          type={type ? type : "text"}
          disabled={disabled}
          onChange={(e)=>onChange(e,name,value)}
          error={!!error}
          helperText={error ? error.message : null}
          endAdornment={
            <InputAdornment position="end">
              <img
                src={editIcon}
                alt={editIcon}
                style={{ cursor: 'pointer' }}
              />
            </InputAdornment>
          }
        />
      </FormControl>
    </Grid>
  )
}

export default CustomInput
