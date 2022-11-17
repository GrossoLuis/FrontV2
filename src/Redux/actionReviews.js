import axios from 'axios';
export const ADD_REVIEW = "addReview";
export const ERROR_MESSAGE = "errorMesage";
export const UPDATE_REVIEW= "updateReview";
export const OBTENER_MATCH= "obtenerMatch";
export const CLEAN_COMMENT="cleanComment";


export function addReview(review, productId) {
	return async (dispatch) => {
		await axios
			.post(`/routeReview/${productId}`, review)
			.then((res) => {
				if (res.status === 200) {
					return dispatch({
						type: ADD_REVIEW,
						products: res.data.data,
					});
				} else {
					return dispatch({
						type: ERROR_MESSAGE,
						message: 'error al agregar review',
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function updateReview(productId, updateRewiew){
	let reviewId = updateRewiew.id;
    return async function (dispatch){
		const response = await axios.put(`/${productId}/review/${reviewId}`)
        return dispatch({
            type: UPDATE_REVIEW,
            payload: response.data
        })
    }
     
}

export function obtenerMatch( userEmail, id){
    return async function (dispatch){
		const info = await axios.get(`/routeReview/pagado?productId=${id}&userEmail=${userEmail}`)
        return dispatch({
            type: OBTENER_MATCH,
            payload: info.data
        })
    }
	
}

export function cleanComment(){
   
        return {
            type: CLEAN_COMMENT,
            payload: false
		}
    }
	
