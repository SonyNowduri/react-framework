import {
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  TextField
} from '@material-ui/core'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import { useForm } from 'react-hook-form'
import React from 'react'
// import {
//     useStripe,
//     useElements,
//     PaymentElement,
//     CardElement,
//     CardNumberElement,
//     CardExpiryElement,
//     CardCvcElement
// } from '@stripe/react-stripe-js'

const TextFeildComponentWithNumber = (props) => {
  const { handleSubmit, reset, control } = useForm();
  const { name, label, inputValue,error,handleChange,required,onChange,value,numberOfDigits } = props

  // console.log(name,label,)
  // const handleInputChange = (e) => {
  //   console.log(e)
  //   handleChange(name,e)
  // }


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
            type="number"
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, numberOfDigits)
            }}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            // inputProps={{ maxLength: 3 }}
            // maxLength={3}
            // inputProps={{ max: 3}}
            // InputProps={{
            //     // inputComponent: StripeInput,
            //     inputProps: {
            //         component: CardCvcElement
            //     }
            // }}
            // disabled={true}
            // onChange={(e) => handleInputChange(e.target.value)}
            // value={}
            endAdornment={
              <InputAdornment position="end">
                <CreditCardIcon
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

export default TextFeildComponentWithNumber
