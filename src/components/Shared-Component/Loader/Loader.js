import React from 'react'
import classes from './Loader.module.css'
import loader from './'

const Loader = () => {
  return (
    <div className={classes.loaderWrapper} id="loader">
     <img src={loader} alt="loading..." style={{height: '95px', width: '95px'}} />
    </div>
  )
}

export default Loader
