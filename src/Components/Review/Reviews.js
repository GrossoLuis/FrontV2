import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addReview } from '../../Redux/actionReviews';
import { useAuth0 } from '@auth0/auth0-react';
import { getOrder } from '../../Redux/actionsCarrito';
import s from "../../../src/Global.module.css";

export default function Reviews({ productId }) {
    const { user } = useAuth0();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const userEmail = user?.email;
    const usuario = user?.name;

    const [review, setReview] = useState({
        title: usuario,
        content: "",
        rate: "",
        userEmail: userEmail
    });

    var arrcoment = review.content.split(" ");

    const [error, setError] = useState({
        content: "",
        rate: ""
    });


    function validate(e) {
        if (e.target.name === "content") {
            if (arrcoment.length < 5) {
                setError({
                    ...error,
                    name: "Must have at least 5 words"
                });
            }
        }
        if (e.target.name === "rate") {
            if (!e.target.value) {
                setError({
                    ...error,
                    name: "Rate with stars"
                });
            }
        }
    }

    function setRating(e) {
        e.preventDefault();
        setReview({
            ...review,
            rate: e.target.value
        });
    }


    function handleChange(e) {
        e.preventDefault();
        validate(e);
        setReview({
            ...review,
            [e.target.name]: e.target.value
        });
    }

    function handleClick(e) {
        e.preventDefault();

        dispatch(addReview(review, productId));
        setReview({
            content: "",
            rate: ""
        });

        navigate('/search')

    }

    return (
        <div>
            <div>
                <h2 style={{ color: "black" }}>Reviews</h2>
                <form onSubmit={handleClick}>
                    <div>
                        <label>Add to review (min 5 words)</label>
                        <br />
                        <textarea
                            style={{ resize: 'none', borderRadius: '10px', width: '500px', height: '100px' }}
                            name="content"
                            value={review.content}
                            rows="3" cols="70"
                            onChange={e => handleChange(e)} type="text"
                            placeholder=' You review' />
                        {error.content && <p style={{ color: "red" }}>
                            {error.content}</p>}
                    </div>
                    <div>
                        <div>
                            <strong>Stars </strong>
                            <select onChange={e => { setRating(e); }}>
                                <option value="">select</option>
                                <option value="1">⭐ </option>
                                <option value="2">⭐⭐ </option>
                                <option value="3">⭐⭐⭐ </option>
                                <option value="4">⭐⭐⭐⭐ </option>
                                <option value="5">⭐⭐⭐⭐⭐ </option>
                            </select>
                        </div>
                        {error.rate && <p style={{ color: "red" }}>
                            {error.rate}</p>}
                    </div>


                    <button className={s.btnreview} type="submit" value="Enviar Review"> Submit </button>
                </form>

            </div>

        </div>
    );
} 
