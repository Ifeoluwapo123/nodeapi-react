import React, { Component } from 'react';

class Products extends Component {

    componentDidMount() {
        if (!window.sessionStorage.getItem('id')) {
            this.props.history.push('/login?logincredentials');
        }
    }

    render() {
        return (
            <p>This is the products page</p>
        );
    }
}

export default Products;