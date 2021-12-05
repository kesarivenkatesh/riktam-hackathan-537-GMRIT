import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { setCurrentUser, updateCurrentUser } from '../actions/authActions';

// Components
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Home = props => {
    const [feed, setFeed] = useState([]);
    const [form, setForm] = useState({
        location: '',
        request_name: '',
        request_description: '',
        karma_points: 0
    })


    const getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                setForm({
                    ...form,
                    location: latitude + ' ' + longitude
                })
            })
        }
    }

    useEffect(() => {
        // Check Authentication
        if (!props.auth.isAuthenticated) {
            window.location.href = '/login';
        }
        // Send Request & set Feed
        axios.get('/api/request')
            .then(res => {
                setFeed(res.data.filter(request => request.status === 'pending'));
            })
            .catch(err => console.error(err));
    }, [props.auth.isAuthenticated]);


    const handleFormFields = e => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    }

    const add_new_request = e => {
        axios.post('/api/request', form)
            .then(res => setFeed([...feed, res.data[0]]))
            .catch(err => console.error(err));
    }

    const acceptRequest = (id) => {
        axios.get('/api/request/' + id)
            .then(res => {
                const newFeed = feed.filter(item => item._id !== id);
                props.updateCurrentUser();
                setFeed(newFeed);
            })
            .catch(err => console.error(err));
    }

    return (
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-md-1"></div>
                <div className="col-12 col-md-5 border border-primary feed">
                    <div className="row justify-content-end">
                        <div className="col-6 col-md-3 mt-2" >Add Request <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#addRequest" onClick={getGeoLocation}><AddCircleIcon fontSize="large" /></button></div>
                        <div
                            className="modal fade"
                            id="addRequest"
                            tabIndex="-1"
                            aria-labelledby="addRequestLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="addRequestLabel">Add New Request</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={add_new_request}>
                                            <div className="mb-3">
                                                <label htmlFor="location" className="col-form-label">Location:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="location"
                                                    value={form.location}
                                                    onChange={handleFormFields}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="request_name" className="col-form-label">Item Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="request_name"
                                                    value={form.request_name}
                                                    onChange={handleFormFields}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="request_description" className="col-form-label">Item Description</label>
                                                <textarea
                                                    className="form-control"
                                                    id="request_description"
                                                    value={form.request_description}
                                                    onChange={handleFormFields}
                                                ></textarea>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="karma_points" className="col-form-label">Karma Points</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="karma_points"
                                                    value={form.karma_points}
                                                    onChange={handleFormFields}
                                                />
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="submit" className="btn btn-primary">Create Request</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center feed_main">
                        {feed.map(request => (
                            <div className="col-10 mt-3" key={request.updatedAt}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{request.request_name}</h5>
                                        <p className="card-text">{request.request_description}</p>
                                        <p className="lead">Karma Points: {request.karma_points}</p>
                                        <footer className="blockquote-footer">{request.user_id.firstname}</footer>
                                        <div>
                                            <div className="row justify-content-between">
                                                <div className="col-4">
                                                    {props.auth.user.id !== request.user_id._id && (
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-primary"
                                                            onClick={() => acceptRequest(request._id)}
                                                        >Accept</button>
                                                    )}
                                                </div>
                                                <div className="col-6 col-md-3 align-self-end">
                                                    <p className="card-text"><small className="text-muted">{new Date(request.updatedAt).toDateString()}</small></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-12 col-md-5 border border-primary">
                    <h1>Welcome <span className="text-danger">{props.auth.user.firstname}</span></h1>
                </div>
                <div className="col-md-1"></div>
            </div>
        </div >
    )
}


const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { setCurrentUser, updateCurrentUser })(Home);
