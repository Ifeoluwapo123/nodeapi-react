import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {

    state = {
        username: '',
        id: window.sessionStorage.getItem('id')
    }

    componentDidMount() {

        if (window.sessionStorage.getItem('id') !== null) {
            const api = axios.create({
                baseURL: `http://localhost:3001/api/users/${window.sessionStorage.getItem('id')}`
            });
            api.get('/').then(res => {
                this.setState({ username: res.data.name });
            });
        } else {
            this.props.history.push('/login?logincredentials');
        }
    }

    render() {
        const id = window.sessionStorage.getItem('id');
        if (id) {
            return (
                <div>
                    <section className="page-section">
                        <div className='container'>
                            <div className="text-center" >
                                <br></br><br></br>
                                <h2 className="section-heading text-uppercase">Portfolio</h2>
                                <h3 className="section-subheading text-muted">Welcome {this.state.username}</h3>
                                <button onClick={this.logout}>Logout</button>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 col-sm-6 mb-4">
                                    <div className="portfolio-item">
                                        <a className="portfolio-link" data-toggle="modal" href="">
                                            <div className="portfolio-hover">
                                                <div className="portfolio-hover-content"><i className="fas fa-plus fa-3x"></i></div>
                                            </div>
                                            <img className="img-fluid" src="assets/img/portfolio/01-thumbnail.jpg" alt="" />
                                        </a>
                                        <div className="portfolio-caption">
                                            <div className="portfolio-caption-heading"></div>
                                            <div className="portfolio-caption-subheading text-muted"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            );
        } else {
            return <div></div>
        }
    }

    logout = () => {
        this.props.history.push('/logout');
    }
}

export default Profile;