import { combineReducers } from '@reduxjs/toolkit';
import serviceReducer from './application/service/service.reducer';
import sitterReducer from './application/sitter/sitter.reducer';
import appliedReducer from './application/applied/applied.reducer';
import bookingReducer from './application/booking/booking.reducer';
import customerReducer from './application/customer/customer.reducer';

const createReducer = (asyncReducers) =>
  combineReducers({
    serviceReducer,
    sitterReducer,
    appliedReducer,
    bookingReducer,
    customerReducer,
    ...asyncReducers,
  });
export default createReducer;
