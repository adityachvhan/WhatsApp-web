import { BASE_API_URL } from "../../Config/api";
import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE } from "./ActionType";

export const createMessage = (messageData) => async (dispatch) => {

    try {
        const response = await fetch(`${BASE_API_URL}/api/messages/create`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${messageData.token}`
            },
            body: JSON.stringify(messageData.data)
        })
        const data = await response.json();
        console.log("createMessage", data);
        dispatch({ type: CREATE_NEW_MESSAGE, payload: data })

    } catch (error) {
        console.log(error);
    }
}

export const getAllMessages = (resData) => async (dispatch) => {

    try {
        const response = await fetch(`${BASE_API_URL}/api/messages/chat/${resData.chatId}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${resData.token}`
            },
            // body: JSON.stringify(messageData.data)
        })
        const data = await response.json();
        console.log("createMessage", data);
        dispatch({ type: GET_ALL_MESSAGE, payload: data })

    } catch (error) {
        console.log(error);
    }
}