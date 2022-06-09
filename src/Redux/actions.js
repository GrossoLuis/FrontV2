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

const URL = 'http://localhost:3001';

export function findOrCreateUser(user) {
    return async function (dispatch) {
        const res = await axios.post(`${URL}/admin/register`, user);
        const userDB = res.data;
        dispatch({
            type: FIND_OR_CREATE_USER,
            payload: [userDB]
        });
    };
}

export function findProduct(name) {
    return async function (dispatch) 
    
    {   console.log(name);
        const res = await axios.get(`${URL}/paginado?name=${name}`);
        const product = res.data;
        dispatch({
            type: SEARCH_PRODUCT,
            payload: product
        });
    };
}

export function obtenerTodosProducts() {
    return (dispatch) => {
        axios.get(`${URL}/products`)
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
        axios.get(`${URL}/category`)
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
    console.log(arrObjAux, 'filtro');
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
    console.log(arrObjAux, 'orden');
    if (arrObjAux.length > 0) { arrObj = arrObjAux; }
    let aux = [];
    let estado = [];

    return (dispatch) => {
        aux = arrObj.map(e => { return e[atributo]; });
        // console.log(aux)
        if (atributo === 'name') {
            aux = aux.sort();
        }
        else if (atributo === 'price') {
            aux = ordenarBublee(aux);
            console.log(aux);

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
        axios.post(`${URL}/createProduct`, body)
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
        console.log(id, 'voy', body, 'yendo');
        axios.put(`${URL}/updateproduct/${id}`, body)
            .then(() => {
                return dispatch({
                    type: UPDATEPRODUCT,
                    payload: ['actualizando', body.id]
                });
            });
    };
}

export function crearCategory(body) {
    return (dispatch) => {
        axios.post(`${URL}/crearcategory`, body)
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
        const { data } = await axios.get(`http://localhost:3001/products/${id}`);
        data.name = data.name.replace(/[#-]/g, " ");
        data.category = data.category.name.replace(/[#_]/g, " ");
        return dispatch({ type: 'AXIOS_SUCCESS', payload: data });
    } catch (err) {
        return dispatch({ type: 'AXIOS_FAIL', payload: getError(err) });
    }
};

  export const fetchData = (page, category, order, price, query) => async (dispatch) => {
    dispatch({ type: 'AXIOS_REQUEST' })
    try {
      const response = await axios.get(
    `http://localhost:3001/paginado/search?page=${page}&category=${category}&order=${order}&price=${price}&query=${query}`);
    
      return dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
    } catch (err) {
        return dispatch({ type: 'AXIOS_FAIL', payload: getError(err) });
    }
};

export const axiosCategories = () => async (dispatch) => {
    dispatch({ type: 'AXIOS_REQUEST' });
    try {
        const response = await axios.get(`http://localhost:3001/category`);
        return dispatch({ type: 'FETCH_CATEGORIES', payload: response.data });
    } catch (err) {
        return dispatch({ type: 'AXIOS_FAIL', payload: getError(err) });
    }
};



