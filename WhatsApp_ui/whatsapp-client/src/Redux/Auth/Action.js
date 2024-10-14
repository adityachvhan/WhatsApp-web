import { BASE_API_URL } from "../../Config/api"
import { LOGIN, LOGOUT, REGISTER, REQ_USER, SEARCH_USER, UPDATE_USER } from "./ActionType";

export const register = (data) => async (dispatch) => {
    try {
        const response = await fetch(`${BASE_API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const resData = await response.json();
        if (resData.jwt) localStorage.setItem("token", resData.jwt)
        console.log("register", resData);
        dispatch({ type: REGISTER, payload: resData });
    } catch (error) {
        console.error("Error during registration:", error);
    }
};

export const login = (data) => async (dispatch) => {
    try {
        const response = await fetch(`${BASE_API_URL}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const resData = await response.json();
        console.log("login", resData);
        dispatch({ type: LOGIN, payload: resData });
    } catch (error) {
        console.error("Error during login:", error);
    }
};

export const currentUser = (token) => async (dispatch) => {
    try {
        const response = await fetch(`${BASE_API_URL}/api/users/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',  // Fixed typo in 'application/json'
                Authorization: `Bearer ${token}`
            },
        });

        const resData = await response.json();  // Corrected json() method
        console.log("currentUser", resData);
        dispatch({ type: REQ_USER, payload: resData });
    } catch (error) {
        console.error("Error fetching current user:", error);
    }
};

export const searchUser = (data) => async (dispatch) => {
    try {
        const response = await fetch(`${BASE_API_URL}/api/users/search?name=${data.keyword}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',  // Fixed typo in 'application/json'
                Authorization: `Bearer ${data.token}`
            },
        });

        const resData = await response.json();  // Corrected json() method
        console.log("searchUser", resData);
        dispatch({ type: SEARCH_USER, payload: resData });
    } catch (error) {
        console.error("Error during user search:", error);
    }
};

export const updateUser = (data) => async (dispatch) => {
    try {
        const response = await fetch(`${BASE_API_URL}/api/users/update/${data.id}`, {
            method: 'POST',  // Assuming this should be 'POST', not 'GET' for updating
            headers: {
                'Content-Type': 'application/json',  // Fixed typo in 'application/json'
                Authorization: `Bearer ${data.token}`
            },
            body: JSON.stringify(data)  // You probably want to send user data in the body
        });

        const resData = await response.json();  // Corrected json() method
        console.log("updateUser", resData);
        dispatch({ type: UPDATE_USER, payload: resData });
    } catch (error) {
        console.error("Error updating user:", error);
    }
};

export const LogoutAction = () => async (dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT, payload: null });
    dispatch({ type: REQ_USER, payload: null });
};
