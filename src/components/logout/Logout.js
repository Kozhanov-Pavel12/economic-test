import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';
import { Redirect } from 'react-router-dom'

class Logout extends React.Component {
    componentDidMount() {
        this.props.logout()
    }

    render() {
        return <Redirect to={'/'}/> //проводим редирект на основную страницу
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch( logout() )
    }
}

export default connect(null, mapDispatchToProps)(Logout);