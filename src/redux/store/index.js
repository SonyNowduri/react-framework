import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';
import logger from "redux-logger";


console.log(process.env.REACT_APP_API_KEY,'dhskja')

const store = createStore(
    reducers,
    applyMiddleware(logger, thunk)
);


export default store;