import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import image from './header-bg.jpg'
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api/users'
});

class Register extends Component {

    state = {
        submitStatus: false,
        error: '',
        success: ''
    }

    style = {
        alignItems: 'auto',
        display: 'flex',
        flexDirection: 'column',
        width: 400,
    }

    check = {
        color: 'red'
    }

    background = {
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        verticallyAlign: 'middle',
        height: '85vh',
        opacity: '0.85'
    }

    render() {
        const show = (this.state.submitStatus) ? 'Submiting...' : 'Submit',
            error = (this.state.error !== '') ? this.state.error : '',
            success = (this.state.success !== '') ? this.state.success : '';
        return (
            <div style={this.background}>
                <div className='container' style={this.style}>
                    <form id='form' onSubmit={this.submitForm} style={{ marginTop: 80 }}>
                        <h2 style={{ color: '#fff', fontFamily: 'cursive' }}>Sign up</h2>
                        <p style={this.check}>{error}</p>
                        <p style={{ color: 'green' }}>{success}</p>
                        <div className="form-group">
                            <label htmlFor="exampleInputName" style={{ color: '#fff' }}>Full Name</label>
                            <input type="text" name='name' className="form-control" placeholder="Enter Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" style={{ color: '#fff' }}>Email address</label>
                            <input type="email" name='email' className="form-control" placeholder='Enter Email' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" style={{ color: '#fff' }}>Password</label>
                            <input type="password" name='password' className="form-control" placeholder='Enter Password' />
                        </div>
                        <button type="submit" name='submit' className="btn btn-primary">{show}</button>
                    </form>
                    <em><Link style={{ float: 'right', textDecoration: 'none' }} to='/login'>Login?</Link></em>
                </div>
            </div>
        );
    }

    submitForm = async (e) => {
        e.preventDefault();
        this.setState({ submitStatus: !this.state.submitStatus });
        let res = await api.post('/', { name: e.target[0].value, email: e.target[1].value, password: e.target[2].value });
        console.log(res.data);
        if (res.data === 'successfully registered') {
            this.setState({ success: res.data });
            document.getElementById('form').reset();
        }
        else {
            this.setState({ error: res.data });
            this.setState({ success: '' });
        }

        this.setState({ submitStatus: !this.state.submitStatus });
    }
}

export default Register;