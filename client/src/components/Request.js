import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import classnames from 'classnames';



// Components
import AddCircleIcon from '@mui/icons-material/AddCircle';



const Request = props => {
    const [requests, setRequests] = useState([]);
    const [form, setForm] = useState({
        location: '',
        request_name: '',
        request_description: '',
        karma_points: ''
    });
    const [errors, setErrors] = useState({});


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

    const addNewRequest = e => {
        e.preventDefault();
        axios.post('/api/request', form)
            .then(res => {
                setRequests([...requests, res.data.request]);
                setForm({
                    location: '',
                    request_name: '',
                    request_description: '',
                    karma_points: ''
                })
            })
            .catch(err => setErrors(err.response.data))
    }

    const handleFormFields = e => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    }

    useEffect(() => {
        // Check Authentication
        if (!props.auth.isAuthenticated) {
            window.location.href = '/login';
        }

        // Get Requests
        axios.get('/api/request')
            .then(res => {
                setRequests(res.data.filter(request => request.user_id._id === props.auth.user.id));
            })
    }, [props.auth]);


    const deleteRequest = id => {
        axios.delete('/api/request/' + id)
            .then(res => {
                setRequests(requests.filter(request => request._id !== id));
            })
            .catch(err => console.log(err));
    }


    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="row justify-content-center">
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
                                            <form onSubmit={addNewRequest}>
                                                <div className="mb-3">
                                                    <label htmlFor="location" className="col-form-label">Location:</label>
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control",
                                                            {
                                                                'is-invalid': errors.location
                                                            }
                                                        )}
                                                        id="location"
                                                        value={form.location}
                                                        onChange={handleFormFields}
                                                    />
                                                    {errors.location && (<div className="invalid-feedback">{errors.location}</div>)}

                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="request_name" className="col-form-label">Request Item Name</label>
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control",
                                                            {
                                                                'is-invalid': errors.request_name
                                                            }
                                                        )}
                                                        id="request_name"
                                                        value={form.request_name}
                                                        onChange={handleFormFields}
                                                    />
                                                    {errors.request_name && (<div className="invalid-feedback">{errors.request_name}</div>)}

                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="request_description" className="col-form-label">Request Item Description</label>
                                                    <textarea
                                                        className={classnames(
                                                            "form-control",
                                                            {
                                                                'is-invalid': errors.request_description
                                                            }
                                                        )}
                                                        id="request_description"
                                                        value={form.request_description}
                                                        onChange={handleFormFields}
                                                    ></textarea>
                                                    {errors.request_description && (<div className="invalid-feedback">{errors.request_description}</div>)}

                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="karma_points" className="col-form-label">Karma Points</label>
                                                    <input
                                                        type="number"
                                                        className={classnames(
                                                            "form-control",
                                                            {
                                                                'is-invalid': errors.karma_points
                                                            }
                                                        )}
                                                        id="karma_points"
                                                        value={form.karma_points}
                                                        onChange={handleFormFields}
                                                    />
                                                    {errors.karma_points && (<div className="invalid-feedback">{errors.karma_points}</div>)}

                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" id="close" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="submit" className="btn btn-primary">Create Request</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {requests.map(request => (
                        <div className="col-10 col-md-6 mx-auto mt-3" key={request._id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{request.request_name}</h5>
                                    <p className="card-text">{request.request_description}</p>
                                    <p className="lead">Karma Points: {request.karma_points}</p>
                                    <p className="lead">Status: {request.status}</p>

                                    <div>
                                        <div className="row justify-content-between">
                                            <div className="col-4">
                                                {
                                                    props.auth.user.id === request.user_id._id && (
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-danger"
                                                            onClick={() => deleteRequest(request._id)}
                                                        >Delete</button>
                                                    )
                                                }
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
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(Request)
