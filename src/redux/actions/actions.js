export const setLoader = (value) => {
    return {type: 'LOADER', value};
  };
  
  export const setUserInfo = (value) => {
    return {type: 'USERDATA', value};
  };

  export const updateSnackbarState = (value) => {
    return { type: 'UPDATE_SNACKBAR', value }
  }