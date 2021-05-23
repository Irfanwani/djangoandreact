import React, { Component, Fragment } from 'react'
import {withAlert} from 'react-alert'
import {connect} from 'react-redux'

export class Alerts extends Component {
    componentDidUpdate(prevProps) {
        const {error, alert, message} = this.props;
        if(error !== prevProps.error) {
            if(error.msg.name) alert.error(`Name: ${error.msg.name.join()}`)
            if(error.msg.email) alert.error(`Email: ${error.msg.email.join()}`)
            if(error.msg.message) alert.error(`Message: ${error.msg.message.join()}`)
            if(error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join())
            if(error.msg.username) alert.error(error.msg.username.join())
            

        }
        
        if(message !== prevProps.message) {
            if(message.loginSuccess) alert.success(message.loginSuccess)

            if(message.logoutSuccess) alert.success(message.logoutSuccess)
            
            if(message.registerSuccess) alert.success(message.registerSuccess)

            if(message.leadDeleted) alert.success(message.leadDeleted)

            if(message.leadAdded) alert.success(message.leadAdded)

            if(message.passwordNotMatch) alert.error(message.passwordNotMatch)
        }
    }
    render() {
        return <Fragment />
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
})

export default connect(mapStateToProps)(withAlert()(Alerts))
