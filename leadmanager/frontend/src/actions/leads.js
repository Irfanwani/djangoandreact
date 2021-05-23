import axios from 'axios'

import {createMessage, returnErrors} from './messages'
import * as actions from './types'

import {tokenConfig} from './auth' 

export const getLeads = () => (dispatch, getState) => {
    axios.get("/api/leads/", tokenConfig(getState))
    .then(res => {
        dispatch({
            type: actions.GET_LEADS,
            payload: res.data,
        })
    }).catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
}


export const deleteLead = id => (dispatch, getState) => {
    axios.delete(`/api/leads/${id}/`, tokenConfig(getState))
    .then(res => {
        dispatch(createMessage({leadDeleted: 'Lead deleted'}))
        dispatch({
            type: actions.DELETE_LEAD,
            payload: id,
        })
    }).catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
}


export const addLead = (lead) => (dispatch, getState) => {
    axios.post("/api/leads/", lead, tokenConfig(getState))
    .then(res => {
        dispatch(createMessage({leadAdded: 'Lead added'}))
        dispatch({
            type: actions.ADD_LEAD,
            payload: res.data,
        })
    }).catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
}