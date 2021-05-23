import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../actions/auth'


export class Header extends Component {
    render() {
        const {isAuthenticated, user} = this.props.auth;
        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">Lead Manager</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {isAuthenticated && (
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item navbar-text me-3">
                                    {user ? `Hello! ${user.username}` : ''}
                                </li>
                                <li className="nav-item">
                                    <button onClick={() => this.props.logout()} className='nav-link btn btn-info btn-sm text-light'>Logout</button>
                                </li>
                            </ul>
                        ) || (    
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                            </ul>
                        )

                        }
                   
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(Header)