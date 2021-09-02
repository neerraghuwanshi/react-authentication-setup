import { 
    SET_AUTH_LOADING,
    SET_AUTH_SUCCESS, 
    SET_AUTH_ERROR, 
    SET_AUTH_INITIALS,
    AUTH_LOGOUT,
} from '../actions/auth';


const initialState = {
    name: null,
    email: null,
    token: null,
    error: null,
    loading: false,
    doneSettingInitialState: false,
}

export const authReducer = (state=initialState, action) => {
    switch(action.type){
        case SET_AUTH_LOADING:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case SET_AUTH_SUCCESS:
            localStorage.setItem('token', action.token)
            return {
                ...state,
                loading: false,
                name : action.name,
                email : action.email,
                token : action.token,
            }
        case SET_AUTH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        case SET_AUTH_INITIALS:
            return {
                ...state,
                name: action.name,
                email: action.email,
                token: action.token,
                doneSettingInitialState: true,
            }
        case AUTH_LOGOUT:
            localStorage.removeItem('token', action.token)
            return {
                ...state,
                name: null,
                email: null,
                token: null,
                doneSettingInitialState: true,
            }
        default:
            return state
    }
}


