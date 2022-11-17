import { getError } from '../../utils';
import axios from 'axios';
import { useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const reducer = (state, action) => {
    switch (action.type) {
      case 'AXIOS_REQUEST':
        return { ...state, loading: true };
      case 'AXIOS_SUCCESS':
        return {
          ...state,
          category: action.payload,
        };
      case 'AXIOS_FAIL':
        return { ...state, loading: false, error: action.payload };

      default:
        return state;
    }
  };

export default function FilterCategories(){

    const navigate = useNavigate()

    const [{ category, error}, dispatch] =
    useReducer(reducer, {
      error: '',
      category: []
    });

useEffect(() => {
  const axiosCategories = async () => {
    try {
    const { data } = await axios.get(`/category`);
    dispatch({ type: 'AXIOS_SUCCESS', payload: data});
    } catch (err) {
    dispatch({type: 'AXIOS_FAIL', payload: getError(err),});
    }
  };
  axiosCategories();
}, [dispatch]);


function getFilterUrl(e){
    return `/category/${e}`
}

return(
        error? (
        <>
            <p> {error}</p>
        </>   
        ) :
    <>
    <select onChange={(e) => {
                      navigate(getFilterUrl(e.target.value));
                    }}>
    <option> Categories </option>
    {category?.map((cat) => (
      
        <option key={cat.name} value={cat.id}>
            {cat.name} 
        </option>
    ))}
    </select>
    </>
)

}
