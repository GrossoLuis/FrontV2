import axios from 'axios';
import ordenarBublee from '../Components/Ordenamiento/ordenarNumeros';
import { getError } from "../Components/Herramientas/utils";


export const FIND_OR_CREATE_USER = 'FIND_OR_CREATE_USER';
export const SEARCH_PRODUCT = 'SEARCH PRODUCT';
export const TODOS_PRODUCT = 'TODOS_PRODUCT';
export const TODOS_CATEGORY = 'TODOS_CATEGORY';
export const FILTRO_POR_CATEGORYAUX = 'FILTRO_POR_CATEGORYAUX';
export const VACIAR_AUXILIARP = 'VACIAR_AUXILIARP';
export const FILTRAR_POR_PRECIO = 'FILTRAR_POR_PRECIO';
export const NO_HAY_MATCH = 'NO_HAY_MATCH';
export const VACIAR_RESPUESTA = 'VACIAR_RESPUESTA';
export const ORDENAR = 'ORDENAR';
export const AGREGARCARRITO = 'AGREGARCARRITO';
export const ELIMINARDECARRITO = 'ELIMINARDECARRITO';
export const FILTRO_POR_CATEGORY = 'FILTRO_POR_CATEGORY';
export const ACTUALIZAR = 'ACTUALIZAR';
export const CREATEPRODUCT = 'CREATEPRODUCT';
export const UPDATEPRODUCT = 'UPDATEPRODUCT';
export const CREARCATEGORY = 'CREARCATEGORY';
export const CLEANUSER = 'CLEANUSER';
export const UPDATEPROFILEUSER = 'UPDATEPROFILEUSER';
export const TODOSUSERS = 'TODOSUSERS';
export const UPDATEFUNCTION = 'UPDATEFUNCTION';
export const GET_PAYMENT_ID = 'GET_PAYMENT_ID';
export const GET_ALLORDERS = 'GET_ALLORDERS';
export const UPDATEORDER = 'UPDATEORDER';


export function findOrCreateUser(user) {
    return (dispatch) => {
        axios.post(`/admin/register`, user)
            .then((r) => {
                if (r.data[0] !== 'banned') {
                    dispatch({
                        type: FIND_OR_CREATE_USER,
                        payload: [r.data]
                    });

                } else (
                    dispatch({
                        type: FIND_OR_CREATE_USER,
                        payload: ['banned']
                    })
                );
            });
    };
}

export function findProduct(name) {
    return async function (dispatch) {
        const res = await axios.get(`/paginado?name=${name}`);
        const product = res.data;
        dispatch({
            type: SEARCH_PRODUCT,
            payload: product
        });
    };
}

export function getPayId(payment_id) {
    return async function (dispatch) {
        const pay = await axios.get(`/purchases/${payment_id}`);
        dispatch({
            type: GET_PAYMENT_ID,
            payload: pay.data
        });
    };
}

export function obtenerTodosProducts() {
    return (dispatch) => {
        axios.get(`/products`)
            .then((r) => {
                return dispatch({
                    type: TODOS_PRODUCT,
                    payload: r.data
                });
            })
            .catch((err) => console.log(err));

    };
}

export function obtenerTodosCategory() {
    return (dispatch) => {
        axios.get(`/category`)
            .then((r) => {

                return dispatch({
                    type: TODOS_CATEGORY,
                    payload: r.data,
                });
            })
            .catch((err) => console.log(err));
    };
}

export function filtroPorCategory(arrObj, arrObjAux, value) {
    let r = [];
    if (arrObjAux.length > 0) { arrObj = arrObjAux; }
    return (dispatch) => {
        if (arrObj.length > 0 && value) {
            r = arrObj.filter(e => e.category.id * 1 === value * 1);
        }

        if (arrObjAux > 0) {
            return dispatch({
                type: FILTRO_POR_CATEGORYAUX,
                payload: r
            });
        } else {
            return dispatch({
                type: FILTRO_POR_CATEGORY,
                payload: r
            });
        }
    };
}

export function vaciarProductResultAux() {
    return (dispatch) => {


        return dispatch({
            type: VACIAR_AUXILIARP,
            payload: ''
        });
    };
}

export function filtrarPorPrecio(arrObj, arrObjAux, value) {
    let r = [];

    if (arrObjAux.length > 0) { arrObj = arrObjAux; }
    return (dispatch) => {
        r = arrObj.filter(e => e.price * 1 < value);
        if (r.length === 0) {
            let respuesta = [{ msg: 'no hay match' }];
            return dispatch({
                type: NO_HAY_MATCH,
                payload: respuesta
            });
        }

        return dispatch({
            type: FILTRAR_POR_PRECIO,
            payload: r
        });
    };
}

export function vaciarRespuesta() {
    return (disptach) => {
        return disptach({
            type: VACIAR_RESPUESTA,
            payload: ''
        });
    };
}

export function ordenar(arrObj, arrObjAux, atributo, bandera) {

    if (arrObjAux.length > 0) { arrObj = arrObjAux; }
    let aux = [];
    let estado = [];

    return (dispatch) => {
        aux = arrObj.map(e => { return e[atributo]; });
        if (atributo === 'name') {
            aux = aux.sort();
        }
        else if (atributo === 'price') {
            aux = ordenarBublee(aux);


        }
        if (bandera) { aux = aux.reverse(); }

        while (aux.length > 0) {
            for (let e of arrObj) {
                if (e[atributo] === aux[0]) {
                    estado.push(e);
                    aux.shift();
                }
            }
        }

        return dispatch({
            type: ORDENAR,
            payload: estado


        });
    };
}

export function eliminarProductoCarrito(obj, arrObj) {
    return (dispatch) => {
        obj.EstoyEnElcarro = false;
        arrObj = arrObj.filter(e => e.id !== obj.id);
        return dispatch({
            type: ELIMINARDECARRITO,
            payload: arrObj
        });

    };
}

export function actualizar(arrObj) {
    return (dispatch) => {

        return dispatch({
            type: ACTUALIZAR,
            payload: arrObj
        });
    };
}

export function createProduct(body) {
    return (dispatch) => {
        axios.post(`/createProduct`, body)
            .then(() => {
                return dispatch({
                    type: CREATEPRODUCT,
                    payload: ['creando', body.name]
                });
            })
            .catch((err) => console.log(err));
    };
}

export function upDateProduct(id, body) {
    return (dispatch) => {

        axios.put(`/updateproduct/${id}`, body)
            .then(() => {
                return dispatch({
                    type: UPDATEPRODUCT,
                    payload: ['actualizando', body.id]
                });

            })
            .catch((err) => console.log(err));
    };
}

export function crearCategory(body) {
    return (dispatch) => {
        axios.post(`/crearcategory`, body)
            .then(() => {
                return dispatch({
                    type: CREARCATEGORY,
                    payload: ['category', body.name, 'creada']
                });

            })
            .catch((err) => console.log(err));
    };
}


export const axiosDataId = (id) => async (dispatch) => {
    dispatch({ type: 'AXIOS_REQUEST' });
    try {
        const { data } = await axios.get(`/products/${id}`);
        data.name = data.name.replace(/[#-]/g, " ");
        data.category = data.category.name.replace(/[#_]/g, " ");
        return dispatch({ type: 'AXIOS_SUCCESS', payload: data });
    } catch (err) {
        return dispatch({ type: 'AXIOS_FAIL', payload: getError(err) });
    }
};

export const fetchData = (page, category, order, price, query) => async (dispatch) => {
    dispatch({ type: 'AXIOS_REQUEST' });
    try {
        const response = await axios.get(
            `/paginado/search?page=${page}&category=${category}&order=${order}&price=${price}&query=${query}`);

        return dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
    } catch (err) {
        return dispatch({ type: 'AXIOS_FAIL', payload: getError(err) });
    }
};

export const axiosCategories = () => async (dispatch) => {
    dispatch({ type: 'AXIOS_REQUEST' });
    try {
        const response = await axios.get(`/category`);
        return dispatch({ type: 'FETCH_CATEGORIES', payload: response.data });
    } catch (err) {
        return dispatch({ type: 'AXIOS_FAIL', payload: getError(err) });
    }

};
export function cleanUser() {
    return (dispatch) => {

        return dispatch({
            type: CLEANUSER,
            payload: []
        });
    };
}

export function upDateProfileUser(id, body) {
    return (dispatch) => {
        axios.put(`/update/profileuser/${id}`, body)
            .then((r) => {
                return dispatch({
                    type: UPDATEPROFILEUSER,
                    payload: [{ user: r.data }]
                });
            })
            .catch((err) => console.log(err));


    };
}
export function todosUsers() {
    return (dispatch) => {
        axios.get(`/users`)
            .then((r) => {
                return dispatch({
                    type: TODOSUSERS,
                    payload: r.data
                });
            })
            .catch((err) => console.log(err));
    };
}
export function upDateFunction(id, body) {
    return (dispatch) => {
        axios.put(`/updatefunction/${id}`, body)
            .then((r) => {
                return dispatch({
                    type: UPDATEFUNCTION,
                    payload: ['update function']
                });
            });


    };
}
export function getOrders() {
    return (dispatch) => {
        axios.get(`/taskmanager`)
            .then((r) => {
                return dispatch({
                    type: GET_ALLORDERS,
                    payload: r.data
                });
            })
            .catch((err) => console.log(err));

    };
}
export function upDateOrder(id, body) {

    return (dispatch) => {

        axios.put(`/updateStatus/${id}`, body)
            .then((r) => {
                return dispatch({
                    type: UPDATEORDER,
                    payload: ['algo']
                });
            })
            .catch((err) => console.log(err));






    };
}
