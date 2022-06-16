import axios from "axios";

export const AGREGARCARRITO='AGREGARCARRITO';
export const REMOVE_FROM_CART='REMOVE_FROM_CART';
export const CLEAR_CART="CLEAR_CART";
export const POST_ORDER="POST_ORDER";
export const GET_ORDERS="GET_ORDERS";
export const DELETE_ORDER="DELETE_ORDER";
export const PUT_ORDER="PUT_ORDER";
export const POST_ALL_ORDERS="POST_ALL_ORDERS";
export const CHANGE_ORDER_STATUS="CHANGE_ORDER_STATUS";
export const GET_USER_INFO="GET_USER_INFO"

export const addToCart = (product) => ({type:AGREGARCARRITO, payload: product})

export const removeFromCart = (product) => ({type:REMOVE_FROM_CART, payload: product})

export const clearCart = () => ({type:CLEAR_CART})


export const postOrder = (order) => async (dispatch) => {

    var { data } = await axios.post(`/order`, order);
        return dispatch({
            type: POST_ORDER,
            payload: { status: order.status, data },
        });
}

export const getOrder = (order) => async (dispatch) => {
    // var objeto = {user: order.user}
    

    var {data} = await axios.get(`/order?status=${order.status}&user=${order.user}&purchaseId=${order.purchaseId}`)
    return dispatch({
        type: GET_ORDERS,
        payload: { status: order.status, data },
    });
}

export const deleteOrder = (order) => async (dispatch) => {
    var { data } = await axios.delete(`/order/${order}`)
    return dispatch({
        type: DELETE_ORDER,
        payload: { status: order.status, data },
    });
}

export const putOrder = (order) => async (dispatch) => {
    var { data } = await axios.put(`/order`, {
        amount: order.amount,
        productId: order.productId,
        status: order.status,
        user: order.user
      })
    return dispatch({
        type: PUT_ORDER,
        payload: { status: order.status, data}
    })
}

export const postAllOrders = (order) => async (dispatch) => {
    var { data } = await axios.post(`/order/postAllOrders`, order)

    return dispatch({
        type: POST_ALL_ORDERS,
        payload: data
    })
}

export const changeOrderStatus = (order) => async (dispatch) => {
    var { data } = await axios.put(`/mercadopay`, order)
    return dispatch({
        type: CHANGE_ORDER_STATUS,
        payload: data
    })
}

export const getUserInfo = (user) => async (dispatch) => {
    var { data } = await axios.get(`/users/${user}`)
    return dispatch({
        type: GET_USER_INFO,
        payload: data
    })
}
