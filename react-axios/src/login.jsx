import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import image from './header-bg.jpg'
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api/user/login'
});

class Login extends Component {

    state = {
        submitStatus: false,
        error: ''
    }

    style = {
        alignItems: 'auto',
        display: 'flex',
        flexDirection: 'column',
        width: 400,
    }

    background = {
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        verticallyAlign: 'middle',
        height: '85vh',
        opacity: '0.85'
    }

    componentDidMount() {
        if (window.sessionStorage.getItem('id')) {
            window.sessionStorage.removeItem('id');
        }
    }

    render() {
        const show = (this.state.submitStatus) ? 'Submiting...' : 'Submit',
            error = (this.state.error !== '') ? this.state.error : '';
        return (
            <div style={this.background}>
                <div className='container' style={this.style}>
                    <form onSubmit={this.submitForm} style={{ marginTop: 80 }}>
                        <h2 style={{ color: '#fff', fontFamily: 'cursive' }}>Login</h2>
                        <p style={{ color: 'red' }}>{error}</p>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" style={{ color: '#fff' }}>Email address</label>
                            <input type="email" name='email' className="form-control"
                                id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Email'></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" style={{ color: '#fff' }}>Password</label>
                            <input type="password" name='password' className="form-control"
                                id="exampleInputPassword1" placeholder='Enter Password'></input>
                        </div>
                        <button type="submit" name='submit' className="btn btn-primary">{show}</button>
                    </form>
                    <em><Link style={{ float: 'right', textDecoration: 'none' }} to='/register'>Register?</Link></em>
                </div>
            </div>
        );
    }

    submitForm = async (e) => {
        e.preventDefault();
        this.setState({ submitStatus: !this.state.submitStatus });
        let res = await api.post('/', { email: e.target[0].value, password: e.target[1].value });
        if (res.data.status === 'successful') {
            let id = res.data.id;
            window.sessionStorage.setItem('id', id);
            this.props.history.push('/profile');
        }
        else {
            this.setState({ error: res.data.status });
            this.setState({ submitStatus: !this.state.submitStatus });
        }
    }
}

export default Login;