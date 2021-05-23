import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const privateRoute = ({component: Component, auth, ...rest}) => (
    <Route
        {...rest}
        render={props => {
            if(auth.isLoading) {
                return <div class="text-center">
                        <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
            }else if(!auth.isAuthenticated) {
                return <Redirect to="/login" />
            }else {
                return <Component {...props} />
            }
        }}
    />
)

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(privateRoute)