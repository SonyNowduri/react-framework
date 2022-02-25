import React from 'react'
import { makeStyles, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@material-ui/core'
import editIcon from '../../../assets/images/editIcon.svg'
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '100%',
    '& .MuiIconButton-root': {
      padding: '0px'
    }
  }
}));

export const TextInputComponent = (props) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { label, name, inputProps, number,type, error, isRequired, value, onChangeEvent, disabledBool} = props;

  const typeObj = {
    number: 'number',
    email: 'email',
    text: 'text',
    url: 'url',
  }
  return (
    <FormControl className={classes.textField}>

      <InputLabel shrink htmlFor={inputProps?.name} style={{ marginTop: '-10px' }}>
        {label}
        {isRequired ? <span style={{ color: 'red', fontSize: '20px', lineHeight: '12px' }}>*</span> : ''}
      </InputLabel>
      <TextField
        {...inputProps}
        name={name}
        textFieldProps={{ InputLabelProps: true }}
        type={typeObj[type]}
        // InputLabelProps={{ shrink: true }}
        error={error}
        onChange={onChangeEvent}
        value={value}
        disabled={disabledBool}
        required={isRequired}
        endAdornment={
            <InputAdornment position="end">
                <IconButton>
              <img
                src={editIcon}
                alt={editIcon}
                style={{ cursor: 'pointer' }}
                // onClick={() => setEditable(!editable)}
              />
              </IconButton>
            </InputAdornment>
          }
      />
    </FormControl>
  )
}

export default TextInputComponent
