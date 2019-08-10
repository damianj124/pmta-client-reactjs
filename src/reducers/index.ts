import { combineReducers } from 'redux'
import authReducer from './authReducers';
import settingsReducers from './settingsReducers';

export default combineReducers({
    auth: authReducer,
    settings: settingsReducers
});
