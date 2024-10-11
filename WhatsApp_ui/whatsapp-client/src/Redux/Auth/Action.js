import { BASE_API_URL } from "../../Config/api"
import { LOGIN, REGISTER, REQ_USER, SEARCH_USER, UPDATE_USER } from "./ActionType";

export const register = (data) => async (dispatch) => {

    try {

        const response = await fetch(`${BASE_API_URL}/auth/signup`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/Json'
            },
            body: JSON.stringify(data)
        })

        const resData = await response.Json();
        console.log("register", resData);
        dispatch({ type: REGISTER, payload: resData })

    } catch (error) {

    }
}


export const login = (data) => async (dispatch) => {

    try {

        const response = await fetch(`${BASE_API_URL}/auth/signin`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/Json'
            },
            body: JSON.stringify(data)
        })

        const resData = await response.Json();
        console.log("register", resData);
        dispatch({ type: LOGIN, payload: resData })

    } catch (error) {

    }
}


export const currentUser = (token) => async (dispatch) => {

    try {

        const response = await fetch(`${BASE_API_URL}/users/profile`, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/Json',
                Authorization: `Bearer ${token}`
            },
        })

        const resData = await response.Json();
        console.log("register", resData);
        dispatch({ type: REQ_USER, payload: resData })

    } catch (error) {

    }
}

export const searchUser = (data) => async (dispatch) => {

    try {

        const response = await fetch(`${BASE_API_URL}/users/search?name=${data.keyword}`, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/Json',
                Authorization: `Bearer ${data.token}`
            },
        })

        const resData = await response.Json();
        console.log("register", resData);
        dispatch({ type: SEARCH_USER, payload: resData })

    } catch (error) {

    }
}


export const updateUser = (data) => async (dispatch) => {

    try {

        const response = await fetch(`${BASE_API_URL}/users/update/${data.id}`, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/Json',
                Authorization: `Bearer ${data.token}`
            },
        })

        const resData = await response.Json();
        console.log("register", resData);
        dispatch({ type: UPDATE_USER, payload: resData })

    } catch (error) {

    }
}