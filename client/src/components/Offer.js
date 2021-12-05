import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const Offer = props => {
    const [offers, setOffers] = useState([]);


    useEffect(() => {
        // Check Authentication
        if (!props.auth.isAuthenticated) {
            window.location.href = '/login';
        }

        // Get Offers
        axios.get('/api/offer')
            .then(res => {
                setOffers(res.data);
            })
    }, [props.auth.isAuthenticated]);

    const deleteOffer = id => {
        axios.delete('/api/offer/' + id)
            .then(res => {
                setOffers(offers.filter(offer => offer._id !== id));
            })
            .catch(err => console.log(err));
    }


    return (
        <div>
            {offers.map(offer => (
                <div className="col-10 col-md-6 mx-auto mt-3" key={offer._id}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{offer.offer_name}</h5>
                            <p className="card-text">{offer.offer_description}</p>
                            <p className="lead">Karma Points Expected: {offer.karma_points_expected}</p>
                            <p className="lead">Status: {offer.status}</p>

                            <div>
                                <div className="row justify-content-between">
                                    <div className="col-4">
                                        {
                                            props.auth.user.id === offer.user_id && (
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger"
                                                    onClick={() => deleteOffer(offer._id)}
                                                >Delete</button>
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
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(Offer)
