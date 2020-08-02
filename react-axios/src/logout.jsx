import React, { Component } from 'react';

class Logout extends Component {

    componentDidMount() {
        if (window.sessionStorage.getItem('id')) {
            window.sessionStorage.removeItem('id');
        }
        this.props.history.push('/');
    }

    render() {
        return (
            <p></p>
        );
    }
}

export default Logout;