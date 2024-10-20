import { LOGIN, REGISTER, REQ_USER, SEARCH_USER, UPDATE_USER } from "./ActionType"

const initialValue = {
    singup: null,
    singin: null,
    reqUser: null
}

export const authReducer = (store = initialValue, { type, payload }) => {

    if (type === REGISTER) {
        return { ...store, singup: payload };
    }
    else if (type === LOGIN) {
        return { ...store, singin: payload }
    }
    else if (type === REQ_USER) {
        return { ...store, reqUser: payload }
    }
    else if (type === SEARCH_USER) {
        return { ...store, searchUser: payload }
    }
    else if (type === UPDATE_USER) {
        return { ...store, updatedUser: payload }
    }
    return store;
}