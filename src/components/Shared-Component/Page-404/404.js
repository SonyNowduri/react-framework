import { Button, Grid } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { getData } from '../../../utils/asyncKeyStorage'
import { ROLES } from '../../../utils/keys'
import { useHistory } from 'react-router'

export const PageNotFound404 = (props) => {
  props
  const history = useHistory()

  const moveToRoot = async () => {
    history.replace('/')
   
  }

  return (
    <div className="container ">
      <Grid className="page-not-found" style={{ textAlign: 'center' }} xs={10} sm={10} md={4} lg={4} xl={4}>
        <h1>Oops  Page Not Found ! </h1>

        <Button onClick={moveToRoot} variant="contained" className="select-btn-active">
          Go Back
        </Button>
      </Grid>
    </div>
  )
}
