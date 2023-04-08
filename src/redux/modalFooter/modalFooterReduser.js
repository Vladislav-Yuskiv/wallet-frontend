import { combineReducers, createReducer } from "@reduxjs/toolkit";
import showModalFooter from "./modalFooterActions"

const modalFooter = createReducer(false, {
    [showModalFooter]: (state, action) => !state,
})

const modalFooterReduser = combineReducers({
    modalFooter,
})

export default modalFooterReduser;