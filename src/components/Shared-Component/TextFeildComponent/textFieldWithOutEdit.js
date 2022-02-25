import {
  FormControl,
  Grid,
  Input,
  InputLabel,
  TextField
} from '@material-ui/core'
import React from 'react'
import { useForm } from 'react-hook-form';

const TextFieldWithOutEdit = (props) => {
  const { handleSubmit, reset, control } = useForm();
  const { name, label, inputValue,error,handleChange,required,onChange,value,numberOfDigits } = props

  // const handleInputChange = (e) => {
  //   console.log(e)
  //   handleChange(name, e)
  // }

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <Grid style={{ marginRight: '7px', marginTop: '5px' }}>
        <FormControl fullWidth>
          <InputLabel shrink htmlFor="standard-basic">
          {error ? <span style={{color:"red"}}>{error.message}</span> : required ? <span  className="required">{label}</span> : label}
          </InputLabel>
          <Input
            id="standard-adornment-password"
            placeholder={error ? label : label}
            value={inputValue}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="text"
            // disabled={true}
            // onChange={(e) => handleInputChange(e.target.value)}
            // value={}
          />
        </FormControl>
      </Grid>
    </Grid>
    // <FormControl style={{ margin: '10px', width: '90%' }}>
    //   <InputLabel shrink htmlFor="standard-basic">
    //     {label}
    //   </InputLabel>
    //   <Input
    //   InputProps={{
    //     readOnly: true,
    //   }}
    //     id="standard-basic"
    //     value={inputValue}
    //     type="text"
    //     // disabled={true}
    //     // onChange={(e) => handleInputChange(e.target.value)}
    //     // value={}
    //   />
    // </FormControl>
  )
}

export default TextFieldWithOutEdit
