import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classnames from 'classnames';


const Signup = () => {
    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        email: '',
        contact_number: '',
        password: '',
        password2: ''
    })

    const [errors, setErrors] = useState({});

    const handleFormFields = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/signup', form)
            .then(res => window.location.href = '/login')
            .catch(err => setErrors(err.response.data))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="page-divider"></div>
            <div className="container">
                <div className="row adminlogin_landing">
                    <div className="card adminlogin_landing_card">
                        <h3 className="text-center display-4" style={{ margin: "15px" }}>
                            User <span className="text-info">Signup</span>
                        </h3>
                        <div className="container ">
                            <div className="row align-items-center justify-content-center adminlogin_landing_card_main">
                                <div className="col-md-6">
                                    <img src="/img/login.png" alt="Login SVG" style={{ width: "100%", height: "auto" }} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group mt-3">
                                        {/* TODO: Create Input Components for easy access */}
                                        <input
                                            type="text"
                                            name="firstname"
                                            placeholder="First Name"
                                            className={classnames(
                                                'form-control adminlogin_landing_card_main_input',
                                                {
                                                    'is-invalid': errors.firstname
                                                }
                                            )}
                                            value={form.firstname}
                                            onChange={handleFormFields}
                                        />
                                        {errors.firstname && (<div className="invalid-feedback">{errors.firstname}</div>)}
                                    </div>
                                    <div className="form-group mt-3">
                                        <input
                                            type="text"
                                            name="lastname"
                                            placeholder="lastname"
                                            className={classnames(
                                                'form-control adminlogin_landing_card_main_input',
                                                {
                                                    'is-invalid': errors.lastname
                                                }
                                            )}
                                            value={form.lastname}
                                            onChange={handleFormFields}
                                        />
                                        {errors.lastname && (<div className="invalid-feedback">{errors.lastname}</div>)}
                                    </div>
                                    <div className="form-group mt-3">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            className={classnames(
                                                'form-control adminlogin_landing_card_main_input',
                                                {
                                                    'is-invalid': errors.email
                                                }
                                            )}
                                            value={form.email}
                                            onChange={handleFormFields}
                                        />
                                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}

                                    </div>
                                    <div className="form-group mt-3">
                                        <input
                                            type="number"
                                            name="contact_number"
                                            placeholder="contact_number"
                                            className={classnames(
                                                'form-control adminlogin_landing_card_main_input',
                                                {
                                                    'is-invalid': errors.contact_number
                                                }
                                            )}
                                            value={form.contact_number}
                                            onChange={handleFormFields}
                                        />
                                        {errors.contact_number && (<div className="invalid-feedback">{errors.contact_number}</div>)}

                                    </div>
                                    <div className="form-group mt-3">
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            className={classnames(
                                                'form-control adminlogin_landing_card_main_input',
                                                {
                                                    'is-invalid': errors.password
                                                }
                                            )}
                                            value={form.password}
                                            onChange={handleFormFields}
                                        />
                                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                    </div>
                                    <div className="form-group mt-3">
                                        <input
                                            type="password"
                                            name="password2"
                                            placeholder="Confirm Password"
                                            className={classnames(
                                                'form-control adminlogin_landing_card_main_input',
                                                {
                                                    'is-invalid': errors.password2
                                                }
                                            )}
                                            value={form.password2}
                                            onChange={handleFormFields}
                                        />
                                        {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                                    </div>
                                    {errors.err && (<p className="text-danger">{errors.err}</p>)}
                                    <div className="row form-group mt-3">
                                        <button type="submit" className="btn btn-info adminlogin_landing_card_main_input">Signup</button>
                                    </div>
                                    <small className="text-muted">Already a user? </small><Link to="/login">Click here to Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Signup
