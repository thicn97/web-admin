import { combineReducers } from '@reduxjs/toolkit';
import serviceReducer from './application/service/service.reducer';
import sitterReducer from './application/sitter/sitter.reducer';

const createReducer = (asyncReducers) =>
  combineReducers({
    serviceReducer,
    sitterReducer,
    ...asyncReducers,
  });
export default createReducer;
