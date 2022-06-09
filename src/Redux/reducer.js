import{AGREGARCARRITO, REMOVE_FROM_CART, CLEAR_CART, POST_ORDER, GET_ORDERS, DELETE_ORDER} from "./actionsCarrito"

import {
    FIND_OR_CREATE_USER, FILTRO_POR_CATEGORYAUX,
    SEARCH_PRODUCT, TODOS_CATEGORY, TODOS_PRODUCT, VACIAR_AUXILIARP, FILTRAR_POR_PRECIO,
    NO_HAY_MATCH, VACIAR_RESPUESTA, ORDENAR,
    FILTRO_POR_CATEGORY, ACTUALIZAR, CREATEPRODUCT, UPDATEPRODUCT, CREARCATEGORY
} from "./actions";

import {GET_REVIEWS} from './actionsReview'

const initialState = {
    userActive: [],
    productResult: [],
    productResultAux: [],
    Allproduct: [],
    Category: [],
    Respuesta: [],
    product: [],
    loading: true,
    error: "",
    postOrder: [],
    inWishList: [],
    inCart: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
    pending: [],
    finished: [],
    deleted: [],
    Reviews:[]
};

export default function rootReducer(state = initialState, { type, payload }) {

    switch (type) {
        case FIND_OR_CREATE_USER:
            return {
                ...state,
                userActive: payload,
            };

        case SEARCH_PRODUCT:
            return {
                ...state,
                productResultAux: payload,
            };
        case TODOS_PRODUCT:
            // console.log('voy',payload)
            return {
                ...state,
                Allproduct: payload,
                // productResultAux:payload,
                productResult: payload,
            };
        case TODOS_CATEGORY:
            return {
                ...state,
                Category: payload
            };
        case FILTRO_POR_CATEGORYAUX:
            return {
                ...state,
                productResultAux: payload
            };
        case VACIAR_AUXILIARP:
            return {
                ...state,
                productResultAux: payload

            };
        case FILTRAR_POR_PRECIO:
            console.log(payload);

            return {
                ...state,
                productResultAux: payload
            };
        case NO_HAY_MATCH:
            return {
                ...state,
                productResultAux: '',
                Respuesta: payload,

            };
        case VACIAR_RESPUESTA:
            return {
                ...state,
                Respuesta: ''
            };

        case ORDENAR:
            // console.log(payload)
            return {
                ...state,
                productResultAux: payload
            };
        case AGREGARCARRITO:

            const newItem = payload;
            const itemInCart = state.inCart?.find((p) => p.id === newItem.id);
            const cartItems = itemInCart
                ? state.inCart.map((item) => item.id === newItem.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item)
                : [...state.inCart, { ...newItem, quantity: 1 }];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
            return {
                ...state,
                inCart: cartItems,
            };
        case REMOVE_FROM_CART:
            const productToDelete = state.inCart?.find((p) => p.id === payload.id);
            const cartProducts = productToDelete?.quantity > 1
                ? state.inCart.map((item) => item.id === productToDelete.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item)
                : state.inCart.filter((p) => p.id !== payload.id);
            localStorage.setItem('cartItems', JSON.stringify(cartProducts));


            return {
                ...state,
                inCart: cartProducts
            };
        case CLEAR_CART:
            localStorage.removeItem('cartItems')
            return { 
                ...state, 
                inCart: [],
            };
        case FILTRO_POR_CATEGORY:
            return {
                ...state,
                productResult: payload,
            };
        case ACTUALIZAR:

            console.log('llega?');
            console.log(payload);
            return {
                ...state,
                productResultAux: '',

                productResult: payload
            };
        case 'AXIOS_REQUEST':
            return { ...state, loading: true };

        case 'AXIOS_SUCCESS':
            return { ...state, loading: false, product: payload };

        case 'AXIOS_FAIL':
            return { ...state, loading: false, error: payload };

        case 'FETCH_SUCCESS':
            return {
                ...state,
                products: payload.products,
                page: payload.page,
                pages: payload.pages,
                countProducts: payload.countProducts,
                loading: false,
            };
        case "FETCH_CATEGORIES":
            return {
                ...state,
                categories: payload,
                loading: false,
            };
        case POST_ORDER:

            return {
            ...state,
            postOrder: payload,
            }
        case GET_ORDERS:
            if(
                payload.status === "inWishList" || 
                payload.status === "inCart" || 
                payload.status === "finished" || 
                payload.status === "pending"){
            return {
                    ...state,
                    [payload.status]: payload.data,
                }} else{
                    return{
                      ...state,
                      historial: payload
                    }
                  }
        case DELETE_ORDER:
            return {
                ...state,
                deleted: payload,
                inCart: []
            };
        case CREATEPRODUCT:
            return {
                ...state,
                Respuesta: payload
            };
        case UPDATEPRODUCT:
            return {
                ...state,
                Respuesta: payload
            };
        case CREARCATEGORY:
            return {
                ...state,
                Respuesta: payload
            };

            //REVIEW
       
        case GET_REVIEWS:
            return {...state, Reviews: payload.reviews}
        
        default: return state;
    }
}
