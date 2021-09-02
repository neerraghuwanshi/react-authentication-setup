import axios from 'axios';

import userUrl from '../../routes/user'
import { 
    setAuthLoading,
    setAuthError,
    setAuthSuccess,
    setAuthInitials,
    authLogout,
} from '../actions/auth';


export const setInitialAuthState = () => {
    return async dispatch => {
        const token = localStorage.getItem('token')
        try {
            if (!token){
                throw new Error('Token not Found')
            }
            const response = await axios.post(
                `${userUrl}/initials`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    timeout: 30000,
                }
            )
            dispatch(setAuthInitials(
                response.data.name,
                response.data.email,
                token,
            ))
        } 
        catch (error) {
            console.log(error.message)
            dispatch(authLogout())
        }
    }
}

export const LoginUser = (
    email,
    password,
    history,
    showModal,
) => {
    return async dispatch => {
        try {
            await dispatch(setAuthLoading())
            const response = await axios.post(
                `${userUrl}/login`, {
                    email, 
                    password,
                }, {
                    timeout: 30000,
                }
            )
            dispatch(setAuthSuccess(
                response.data.name,
                email,
                response.data.token,
            ))
            history.push('/')
        } 
        catch (error) {
            let errorMessage = 'Something Went Wrong'
            if (error.message  === 'Network Error'){
                errorMessage = 'Network Error'
            }
            else if (error.code === "ECONNABORTED"){
                errorMessage = 'Request Timed Out'
            }
            else if (error.response.data){
                switch(error.response.data.message) {
                    case 'Found no user for this email':
                        errorMessage = 'Found no user for this email'
                        break
                    case 'Incorrect password':
                        errorMessage = 'Incorrect Password'
                        break
                    default:
                        break
                }
            }
            else if (error.response.status === 422){
                errorMessage = 'Input Validation Failed'
            }
            dispatch(setAuthError(errorMessage))
            showModal()
        }
    }
}

export const SignUpUser = (
    email,
    firstName,
    lastName,
    password,
    history,
    showModal,
) => {
    return async dispatch => {
        try {
            dispatch(setAuthLoading())
            const response = await axios.post(
                `${userUrl}/signup`, {
                    email,
                    firstName,
                    lastName,
                    password,
                }, {
                    timeout: 30000,
                }
            )
            dispatch(setAuthSuccess(
                response.data.name,
                email,
                response.data.token,
            ))
            history.push('/')
        } 
        catch (error) {
            let errorMessage = 'Something Went Wrong'
            if (error.message  === 'Network Error'){
                errorMessage = 'Network Error'
            }
            else if (error.code === "ECONNABORTED"){
                errorMessage = 'Request Timed Out'
            }
            else if (error.response.data){
                switch(error.response.data.message) {
                    case 'E-mail is already registered':
                        errorMessage = 'E-mail is already registered'
                        break
                    default:
                        break
                }
            }
            else if (error.response.status === 422){
                errorMessage = 'Input Validation Failed'
            }
            dispatch(setAuthError(errorMessage))
            showModal()
        }
    }
}