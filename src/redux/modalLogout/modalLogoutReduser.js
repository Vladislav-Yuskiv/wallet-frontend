import { combineReducers, createReducer } from "@reduxjs/toolkit";
import showModalLogout from "./modalLogoutAction";

const modalLogout = createReducer(false, {
    [showModalLogout]: (state, action) => !state,
})

const modalLogoutReduser = combineReducers({
    modalLogout,
})

export default modalLogoutReduser;