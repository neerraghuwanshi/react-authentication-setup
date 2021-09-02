export const SET_AUTH_LOADING = 'SET_AUTH_LOADING'
export const SET_AUTH_SUCCESS = 'SET_AUTH_SUCCESS'
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR'
export const SET_AUTH_INITIALS = 'SET_AUTH_INITIALS'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'


export const setAuthLoading = () => {
    return {
        type: SET_AUTH_LOADING,
    }
}

export const setAuthSuccess = (name, email, token) => {
    return {
        type: SET_AUTH_SUCCESS,
        name,
        email,
        token,
    }
}

export const setAuthError = (error) => {
    return {
        type: SET_AUTH_ERROR,
        error,
    }
}

export const setAuthInitials = (name, email, token) => {
    return {
        type: SET_AUTH_INITIALS,
        name,
        email,
        token,
    }
}

export const authLogout = () => {
    return {
        type: AUTH_LOGOUT
    }
}