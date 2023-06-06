import { combineReducers, createStore } from "redux";
import { authReducer } from './authState';
import { configureStore } from '@reduxjs/toolkit';
import { companyReducer } from "./companyState";
import { customerReducer, customerState } from './customerState';
import { couponReducer, couponState } from './couponState';

//single reducer
// export const store = createStore(authReducer);


//multiple reducers - use before react 18
//const reducers = combineReducers({authState: authReducer});
//const store = createStore(reducers);

const reducers = combineReducers({authState: authReducer, companyState: companyReducer, customerState: customerReducer, couponState: couponReducer});
export const store = configureStore({reducer: reducers}); 



