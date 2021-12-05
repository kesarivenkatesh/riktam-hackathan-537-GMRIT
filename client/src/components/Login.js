import React, { useEffect, useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import classnames from 'classnames';

const Login = props => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({});

    const handleFormFields = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }


    useEffect(() => {
        if (props.auth.isAuthenticated) {
            window.location.href = '/';
        }
        if (props.errors) {
            setErrors(props.errors);
        }
    }, [props.errors, props.auth.isAuthenticated]);


    const handleSubmit = (e) => {
        e.preventDefault();
        props.loginUser(form);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="page-divider"></div>
            <div className="container">
                <div className="row adminlogin_landing">
                    <div className="card adminlogin_landing_card">
                        <h3 className="text-center display-4" style={{ margin: "15px" }}>
                            Student <span className="text-primary">Login</span>
                        </h3>
                        <div className="container ">
                            <div className="row align-items-center justify-content-center adminlogin_landing_card_main">
                                <div className="col-md-6">
                                    <img src="/img/login.png" alt="Login SVG" style={{ width: "100%", height: "auto" }} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group mt-3">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            className={classnames(
                                                "form-control adminlogin_landing_card_main_input",
                                                {
                                                    'is-invalid': errors.email
                                                })}
                                            value={form.email}
                                            onChange={handleFormFields}
                                        />
                                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                                    </div>
                                    <div className="form-group mt-3">
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            className={classnames(
                                                "form-control adminlogin_landing_card_main_input",
                                                {
                                                    'is-invalid': errors.password
                                                })}
                                            value={form.password}
                                            onChange={handleFormFields}
                                        />
                                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}

                                    </div>
                                    <div className="row form-group mt-3">
                                        <button type="submit" className="btn btn-info adminlogin_landing_card_main_input">Login</button>
                                    </div>
                                    <small className="text-muted">Not a user? </small><Link to="/signup">Click here to register</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}

export default connect(mapStateToProps, { loginUser })(Login)
