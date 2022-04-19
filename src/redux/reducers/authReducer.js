import { ActionTypes } from "../actionType"
//import { auth } from '../../utils/init-firebase'

const initialState = {
    success: null,
    error: null,
    loading: false
}

export const registerUserReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.REGISTER_INITIATE:
            return {...state, loading: payload}
 
        case ActionTypes.REGISTER_SUCCESS:
            return {...state, success: payload, loading: false, error: null}
        case ActionTypes.REGISTER_ERROR:
            return { ...state, error: payload, loading: false, success: null }
        
        case ActionTypes.REMOVE_ERROR:
            return {...state, error: null, loading: false, success: null}
            
        default:
            return state
    }
}

export const loginUserReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.LOGIN_INITIATE:
            return { ...state, loading: payload }
        
        case ActionTypes.LOGIN_SUCCESS:
            return { ...state, success: payload, loading: false, error: null }
        
        case ActionTypes.LOGIN_ERROR:
            return { ...state, error: payload, loading: false, success: null }
        
        case ActionTypes.REMOVE_ERROR:
            return {...state, error: null, loading: false, success: null}
        
        case ActionTypes.GOOGLE_AUTH:
            return { ...state, error: payload }
        
        case ActionTypes.FORGOT_PASSWORD_INITIATE:
            return {...state, loading: payload}
        
        case ActionTypes.FORGOT_PASSWORD_SUCCESS:
            return { ...state, success: payload, loading: false, error: null }
        
        case ActionTypes.FORGOT_PASSWORD_ERROR:
            return { ...state, error: payload, loading: false, success: null }
        
        default:
            return state
    }
}

export const setCurrentUserReducer = (state = null, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_CURRENT_USER:
            return { ...state, ...payload }
    
        default:
            return state
    }
}