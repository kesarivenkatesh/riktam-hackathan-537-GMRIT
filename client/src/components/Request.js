import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const Request = props => {
    const [requests, setRequests] = useState([]);

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
            .catch(err => console.error(err));
    }, [props.auth]);


    const deleteRequest = id => {
        axios.delete(`/api/request/${id}`)
            .then(res => {
                setRequests(requests.filter(request => request._id !== id));
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <h1>Requests</h1>
            {requests.map(request => (
                <div className="col-10 col-md-6 mx-auto mt-3" key={request.updatedAt}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{request.request_name}</h5>
                            <p className="card-text">{request.request_description}</p>
                            <p className="lead">Karma Points: {request.karma_points}</p>
                            <footer className="blockquote-footer">{request.user_id.firstname}</footer>
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
    )
}


const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, {})(Request)
