const initialState = {
    loader: false,
    userInfo: {},
   
  };


  export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOADER':
        return { ...state, loader: action.value };
      case 'USERDATA':
        return { ...state, userInfo: action.value };
      default:
        return state;
    }
  };