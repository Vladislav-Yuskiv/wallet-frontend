import { combineReducers, createReducer } from "@reduxjs/toolkit";
import showModal from "./modalActions"

const modal = createReducer(false, {
    [showModal]: (state, action) => !state,
})

const modalReduser = combineReducers({
    modal,
})

export default modalReduser;