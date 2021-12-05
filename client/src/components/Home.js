import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { setCurrentUser, updateCurrentUser } from '../actions/authActions';



const Home = props => {
    const [requests, setRequests] = useState([]);
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        // Check Authentication
        if (!props.auth.isAuthenticated) {
            window.location.href = '/login';
        }

        // Get Requests
        axios.get('/api/request')
            .then(res => {
                setRequests(res.data.filter(request => request.user_id._id !== props.auth.user.id).filter(offer => offer.status === 'pending'));
            })

        // Get Offers
        axios.get('/api/offer')
            .then(res => {
                setOffers(res.data.filter(offer => offer.user_id !== props.auth.user.id));
            })
    }, [props.auth]);


    const help = id => {
        axios.get(`/api/request/${id}`)
            .then(setRequests(requests.filter(request => request._id !== id)))
            .catch(err => console.error(err));
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-8 col-md-5">
                    <h2>Offers</h2>
                    <hr />
                    <div className="offer_feed">
                        {offers.map(offer => (

                            <div className="card" key={offer._id}>
                                <div className="card-body">
                                    <h5 className="card-title">{offer.offer_name}</h5>
                                    <p className="card-text">{offer.offer_description}</p>
                                    <p className="lead">Karma Points Expected: {offer.karma_points_expected}</p>
                                    <p className="lead">Status: {offer.status}</p>
                                    <div>
                                        <div className="row justify-content-between">
                                            <div className="col-4">
                                                {
                                                    props.auth.user.id !== offer.user_id && (
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-info"
                                                        // onClick={() => deleteOffer(offer._id)}
                                                        >Accept Offer</button>
                                                    )
                                                }
                                            </div>
                                            <div className="col-6 col-md-3 align-self-end">
                                                <p className="card-text"><small className="text-muted">{new Date(offer.updatedAt).toDateString()}</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
                <div className="col-8 col-md-5">
                    <h2>Requests</h2>
                    <hr />
                    <div className="request_feed">
                        {requests.map(request => (

                            <div className="card" key={request._id}>
                                <div className="card-body">
                                    <h5 className="card-title">{request.request_name}</h5>
                                    <p className="card-text">{request.request_description}</p>
                                    <p className="lead">Karma Points: {request.karma_points}</p>
                                    <p className="lead">Status: {request.status}</p>

                                    <div>
                                        <div className="row justify-content-between">
                                            <div className="col-4">
                                                {
                                                    props.auth.user.id !== request.user_id._id && (
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-info"
                                                            onClick={() => help(request._id)}
                                                        >Help</button>
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

                        ))}
                    </div>
                </div>
                <div className="col-1"></div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { setCurrentUser, updateCurrentUser })(Home);
