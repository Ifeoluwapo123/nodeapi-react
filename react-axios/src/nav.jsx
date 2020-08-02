import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {

    state = {
        menu: false
    }

    toggleMenu = () => {
        this.setState({ menu: !this.state.menu })
    }

    render() {
        const show = (this.state.menu) ? 'show' : '';
        return (
            <div style={{ marginBottom: 0 }}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href={'/'}><em>Shopping Mall</em></a>
                    <button className="navbar-toggler" onClick={this.toggleMenu} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={"collapse navbar-collapse " + show} id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/products">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );

    }

}

export default Nav;