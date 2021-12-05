import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const Pending = props => {
    const [pendingOffers, setPendingOffers] = useState([]);

    useEffect(() => {
        axios.get('/api/offer')
            .then(res => {
                setPendingOffers(res.data.filter(offer => offer.status === 'booked').filter(offer => offer.user_id === props.auth.user.id));
            })
    }, [props.auth])


    const closeRequest = (id) => {
        axios.get(`api/request/close/${id}`)
            .then(res => {
                setPendingOffers(pendingOffers.filter(offer => offer._id !== id))
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container">
            <div className="row">
                {pendingOffers.map(offer => (
                    <div className="col-10 col-md-6 mx-auto mt-3" key={offer._id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{offer.offer_name}</h5>
                                <p className="card-text">{offer.offer_description}</p>
                                <p className="lead">Karma Points Added: {offer.karma_points_expected}</p>
                                <p className="lead">Status: {offer.status}</p>

                                <div>
                                    <div className="row justify-content-between">
                                        <div className="col-4">
                                            {
                                                props.auth.user.id === offer.user_id && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger"
                                                        onClick={() => closeRequest(offer._id)}
                                                    >Close</button>
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
                    </div>
                ))}
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(Pending)
