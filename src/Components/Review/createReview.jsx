import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createReview, getReviews} from '../../Redux/actionsReview';

export function reviewCreate (review, id){

    const dispatch = useDispatch();

    const [review, setReview] = useState({
        title: "",
        rate: 0,
        content: "",
        productId: id
    });

    useEffect(() => {
        dispatch(createReview(id))
    }, [dispatch, id]);

    function handleChange(e){
        setReview({
            ...review,
            [e.target.name]: e.target.value,
        })
    }


}
