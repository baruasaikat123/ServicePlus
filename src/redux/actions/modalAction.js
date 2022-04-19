import { ActionTypes } from "../actionType"

export const setModal = (value) => {
    return {
        type: ActionTypes.HANDLE_MODAL,
        payload: value
    }
}