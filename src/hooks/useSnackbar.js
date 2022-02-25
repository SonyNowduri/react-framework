import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateSnackbarState } from '../redux/actions/actions'

const severityValues = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
}

const useSnackbar = () => {
  const [snackbarState, setSnackbarState] = useState()
  const state = useSelector((state) => state.snackbarState)
  const dispatch = useDispatch()

  useEffect(() => {
    setSnackbarState(state)
  }, [state?.show])

  const updateState = (props) => {
    setSnackbarState(props)
    dispatch(updateSnackbarState({ ...props }))
  }
  return { snackbarState, updateState }
}

export { useSnackbar, severityValues }
