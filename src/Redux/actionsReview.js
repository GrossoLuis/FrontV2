import axios from "axios";


export const GET_REVIEWS = 'GET_REVIEWS';
export const CREATE_REVIEW = 'CREATE_REVIEW';
export const REVIEW_UPDATE = 'REVIEW_UPDATE';
export const REVIEW_DELETE = 'REVIEW_DELETE';

const URL = 'localhost:3001';

export function createReview (review, productId){
    return async function () {
        try {
          const reviewCreated = await axios.post(`${URL}/routeReview/${productId}/review`, review);
          return reviewCreated;
        } catch (error) {
          console.log(error);
        }
      };
};

export function deleteReview (productId, reviewId){
    return async function () {
        try {
          const reviewDeleted = await axios.delete(`${URL}/routeReview/${productId}/review/${reviewId}`, {
            data: { id: reviewId },
          });
          return reviewDeleted;
        } catch (error) {
          console.log(error);
        }
      };
};

export function getReviews (productId){
    return async function (dispatch) {
        try {
          var json = await axios.get(`${URL}/routeReview/${productId}/review`);
          return dispatch({
            type: GET_REVIEWS,
            payload: json.data,
          });
        } catch (error) {
          console.log(error);
        }
      };
};

export function updateReview(productId, reviewId) {
    return async function () {
        try {
          const reviewUpdated = await axios.put(`${URL}/routeReview/${productId}/review/${reviewId}`, updateReview);
          return reviewUpdated;
        } catch (error) {
          console.log(error);
        }
      };
}

