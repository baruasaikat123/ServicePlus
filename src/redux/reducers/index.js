import { combineReducers } from "redux"
import { registerUserReducer, loginUserReducer, setCurrentUserReducer } from "./authReducer"
import { setModalReducer } from './modalReducer'

const reducers = combineReducers({
    registerUser: registerUserReducer,
    loginUser: loginUserReducer,
    currentUser: setCurrentUserReducer,
    modalValue: setModalReducer
})

export default reducers