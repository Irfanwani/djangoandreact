import axios from 'axios'

import {createMessage, returnErrors} from './messages'
import * as actions from './types'

export const getLeads = () => dispatch => {
    axios.get("/api/leads/")
    .then(res => {
        dispatch({
            type: actions.GET_LEADS,
            payload: res.data,
        })
    }).catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
}


export const deleteLead = id => dispatch => {
    axios.delete(`/api/leads/${id}/`)
    .then(res => {
        dispatch(createMessage({leadDeleted: 'Lead deleted'}))
        dispatch({
            type: actions.DELETE_LEAD,
            payload: id,
        })
    }).catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
}


export const addLead = (lead) => dispatch => {
    axios.post("/api/leads/", lead)
    .then(res => {
        dispatch(createMessage({leadAdded: 'Lead added'}))
        dispatch({
            type: actions.ADD_LEAD,
            payload: res.data,
        })
    }).catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
}