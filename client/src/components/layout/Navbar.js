import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

const Navbar = props => {
    const [karmaPoints, setKarmaPoints] = useState(0);

    useEffect(() => {
        setKarmaPoints(props.auth.user.karma_points);
    }, [props.auth.user]);


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Friendly Neighbourhood</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarColor01"
                    aria-controls="navbarColor01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        {props.auth.isAuthenticated && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/">
                                        Home <span className="visually-hidden">(current)</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/offers">My Offerings</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/pending">Pending</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/requests">Item Requests</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        to="#"
                                        role="button"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        Profile
                                    </Link>
                                    <div className="dropdown-menu">
                                        <Link className="dropdown-item" to="#">Karmas: {karmaPoints}</Link>
                                        <Link className="dropdown-item" to="/profile">Update Profile</Link>
                                        <div className="dropdown-divider"></div>
                                        <Link className="dropdown-item" to="#" onClick={props.logoutUser}>Logout</Link>
                                    </div>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
});


export default connect(mapStateToProps, { logoutUser })(Navbar);