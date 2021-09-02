import { 
    createStore, 
    applyMiddleware, 
    combineReducers 
} from 'redux'
import Thunk from 'redux-thunk'

import { authReducer } from './reducers/auth'


const reducer = combineReducers({
    auth : authReducer,
})


export const store = createStore(
    reducer,
    applyMiddleware(Thunk)
)