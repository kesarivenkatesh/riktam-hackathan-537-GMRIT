import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import classnames from 'classnames';



// Components
import AddCircleIcon from '@mui/icons-material/AddCircle';



const Offer = props => {
    const [offers, setOffers] = useState([]);
    const [form, setForm] = useState({
        location: '',
        offer_name: '',
        offer_description: '',
        karma_points_expected: ''
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

    const addNewOffer = e => {
        e.preventDefault();
        axios.post('/api/offer', form)
            .then(res => {
                setOffers([...offers, res.data.offer]);
                setForm({
                    location: '',
                    offer_name: '',
                    offer_description: '',
                    karma_points_expected: ''
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

        // Get Offers
        axios.get('/api/offer')
            .then(res => {
                setOffers(res.data.filter(offer => offer.user_id === props.auth.user.id));
            })
    }, [props.auth]);


    const deleteOffer = id => {
        axios.delete('/api/offer/' + id)
            .then(res => {
                setOffers(offers.filter(offer => offer._id !== id));
            })
            .catch(err => console.log(err));
    }


    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="row justify-content-center">
                            <div className="col-6 col-md-3 mt-2" >Add Offer <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#addRequest" onClick={getGeoLocation}><AddCircleIcon fontSize="large" /></button></div>
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
                                            <h5 className="modal-title" id="addRequestLabel">Add New Offer</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={addNewOffer}>
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
                                                    <label htmlFor="request_name" className="col-form-label">Offer Item Name</label>
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control",
                                                            {
                                                                'is-invalid': errors.offer_name
                                                            }
                                                        )}
                                                        id="offer_name"
                                                        value={form.offer_name}
                                                        onChange={handleFormFields}
                                                    />
                                                    {errors.offer_name && (<div className="invalid-feedback">{errors.offer_name}</div>)}

                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="request_description" className="col-form-label">Offer Item Description</label>
                                                    <textarea
                                                        className={classnames(
                                                            "form-control",
                                                            {
                                                                'is-invalid': errors.offer_description
                                                            }
                                                        )}
                                                        id="offer_description"
                                                        value={form.offer_description}
                                                        onChange={handleFormFields}
                                                    ></textarea>
                                                    {errors.offer_description && (<div className="invalid-feedback">{errors.offer_description}</div>)}

                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="karma_points" className="col-form-label">Karma Points Expected</label>
                                                    <input
                                                        type="number"
                                                        className={classnames(
                                                            "form-control",
                                                            {
                                                                'is-invalid': errors.karma_points_expected
                                                            }
                                                        )}
                                                        id="karma_points_expected"
                                                        value={form.karma_points_expected}
                                                        onChange={handleFormFields}
                                                    />
                                                    {errors.karma_points_expected && (<div className="invalid-feedback">{errors.karma_points_expected}</div>)}

                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" id="close" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="submit" className="btn btn-primary">Create Offer</button>
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
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(Offer)
