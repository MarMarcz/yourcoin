// rootReducer.ts
import { combineReducers } from 'redux';
import footerReducer from './footerReducer';

const rootReducer = combineReducers({
  footer: footerReducer,
});

export default rootReducer;