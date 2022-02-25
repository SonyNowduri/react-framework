import {
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  TextField
} from '@material-ui/core'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import { useForm } from 'react-hook-form'
import React from 'react'

const TextFeildComponentWithPerson = (props) => {
  const { handleSubmit, reset, control } = useForm();
  const { name, label, inputValue,error,handleChange,required,onChange,value } = props
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
            type="text"
            // disabled={true}
            // onChange={(e) => handleInputChange(e.target.value)}
            // value={}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            endAdornment={
              <InputAdornment position="end">
                <PersonOutlineIcon
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

export default TextFeildComponentWithPerson
