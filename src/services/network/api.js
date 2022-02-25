import axios from 'axios'
import { getData, removeData } from '../../utils/asyncKeyStorage'
import history from './customHistory'
import {
  showErrorMessage,
  showSuccessMessage,
  showLoadingIndicator,
  hideLoadingIndicator
} from '../../utils/utils'

const BASE_URL = process.env.REACT_APP_BASE_URL
let activeRequests = 0

const appClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const onSuccess = (res) => {
  hideLoader()
  const { data } = res
  if (data?.success) {
    showSuccessMessage(data?.message)
  } else {
    removeToken(data?.statusCode)
    showErrorMessage(data?.message || 'Network error')
  }
  return res?.data || res
}

const onError = (err) => {
  hideLoader()
  console.log(err?.response, "err?.response")
  const { status } = err?.response || {}
  const { viewModel, message, statusCode } = err?.response?.data || {}
  removeToken(status)
  showErrorMessage(
    // viewModel?.errors?.[0] ||
    viewModel?.message ||
    viewModel ||
    message ||
    err?.message ||
    'Network error'
  )
  console.log("wori", statusCode, status)
  if ((status || statusCode) == (405 || 500)) {
    return history.replace('/500')
  }
  return err?.response?.data
}

const hideLoader = () => {
  activeRequests--
  if (!activeRequests) {
    hideLoadingIndicator()
  }
}

const showLoader = () => {
  activeRequests++
  showLoadingIndicator()
}

const removeToken = (statusCode) => {
  if (statusCode === 401 || statusCode === 403) {
    removeData('accessToken')
    window.location.href = '/auth'
  }
}

export const apiRequest = async (options, auth) => {
  showLoader()
  const token = await getData('accessToken')
  console.log(token)
  if (options?.url?.includes('/create-password')) {
    appClient.defaults.headers['Authorization'] = `Bearer ${auth}}`
  } else if (token) {
    appClient.defaults.headers['Authorization'] = `Bearer ${token}`
  }
  return appClient(options).then(onSuccess).catch(onError)
}

export const apiRequestWithoutToken = async (options) => {
  showLoader()
  return appClient(options).then(onSuccess).catch(onError)
}
