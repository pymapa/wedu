import {combineReducers} from 'redux';
import userReducer from './user-reducer';
import messagesReducer from './messages-reducer';

const reducers = combineReducers({
    user: userReducer,
    messages: messagesReducer

})

export default reducers;