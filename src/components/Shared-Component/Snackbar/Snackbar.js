import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { useSnackbar } from '../../../hooks/useSnackbar'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const SnackbarWrapper = () => {
  const { snackbarState, updateState } = useSnackbar()

  const handleClose = () => {
    updateState({
      show: false
    })
  }

  return (
    <Snackbar
      open={snackbarState?.show}
      autoHideDuration={1500}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      key="bottomleft"
    >
      <Alert
        onClose={handleClose}
        severity={snackbarState?.severity}
        style={{ width: '100%' }}
      >
        {snackbarState?.message}
      </Alert>
    </Snackbar>
  )
}

export { SnackbarWrapper }
