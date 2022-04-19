import { ActionTypes } from "../actionType"

const initialState = {
    openModal: false,
}
export const setModalReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.HANDLE_MODAL:
            return { ...state, openModal: payload }
        
        default:
            return state
    }
}
