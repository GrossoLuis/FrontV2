import { useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Product from "../Product/Product";
import estilo from './category.module.css'
import { fetchData, axiosCategories } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { FcSearch } from 'react-icons/fc';

export default function ProductScreen() {
  const navigate = useNavigate()
  const { search } = useLocation();
  const dispatch = useDispatch();

  const pages = useSelector(state => state.pages)
  const error = useSelector(state => state.error)
  const products = useSelector(state => state.products)
  const categories = useSelector(state => state.categories)
  
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get('category') || 'all';
  const query = sp.get('query') || 'all';
  const price = sp.get('price') || '';
  // const rating = sp.get('rating') || 'all';
  const order = sp.get('order') || 'ASC';
  const page = sp.get('page') || 1;
  

    useEffect(() => {
      dispatch(axiosCategories());
      dispatch(fetchData(page, category, order, price, query));
    }, [page, category, order, price, query, dispatch]);



  const getFilterUrl = (e) => {
    const filterPage = e.page || page;
    const filterCategory = e.category || category;
    const filterQuery = e.query || query;
    // const filterRating = e.rating || rating;
    const filterPrice = e.price || price;
    const sortOrder = e.order || order;
    return `/search?category=${filterCategory}&page=${filterPage}&order=${sortOrder}&price=${filterPrice}&query=${filterQuery}`
  };

var ini=0;
var fin=0;


if(parseInt(page)<=3){
  ini=0;
  if(parseInt(pages)<7)
    fin=parseInt(pages);
  else
    fin=5;
}else if(parseInt(page)>=parseInt(pages)-2){
  if(parseInt(pages)<=5)
    ini=0;
  else
    ini=parseInt(pages)-5;
  fin=parseInt(pages);
}else{
  ini = parseInt(page)-3;
  fin = parseInt(page)+2;
}

var input = "";

function handleOnChange(e){
  e.preventDefault()
  const{value}=e.target
  input = value
  return input;
}

function handleOnClick(e){
  e.preventDefault()
  const budget = document.getElementById('budget');
  // 👇️ clear input field
  budget.value = '';
  navigate(getFilterUrl({ price: input , page: 1}))
}

  return (
     products && products.length<1 ? (
      <div className={estilo.size}>
       
        <h1 style={{margin: "100px"}}> <FcSearch style={{ fontSize: '100px'}}/> There are no products that match your search</h1>
      </div>
    ):
      error ? (
        <div className={estilo.size}>
          <p> {error}</p>
        </div>
      ) :
        <div className={estilo.size}>
          <div className={estilo.filterDiv}>
          <select onChange={(e) => {
            navigate(getFilterUrl({
              category: e.target.value,
              page: 1
            }));
          }}
          className={estilo.filter}
          >
          <option value={"all"}>
                  Categories
          </option>
          {categories?.map((cat) => (
          <option key={cat.name} value={cat.id}>
            {cat.name[0] + cat.name.replace(/[#_]/g, " ").slice(1).toLowerCase()} 
          </option>
          ))}
          </select>
          <form className={estilo.search}>
          <input id="budget" type="number" placeholder="Enter your budget here" onChange={(e)=>handleOnChange(e)}/>
          <button className={estilo.buttonSearch} onClick={(e) => handleOnClick(e)}>🔍︎</button>
          </form>
         
            
            
          <select
                onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                      
                    }}
                    className={estilo.filter}
                  >
                    <option value="A-Z">Alphabetical: A to Z</option>
                    <option value="Z-A">Alphabetical: Z to A</option>
                    <option value="ASC">Price: Low to High</option>
                    <option value="DESC">Price: High to Low</option>
                    
          </select>
          
        
          </div>
          
          
          {price !== '' ? (
          <div className={estilo.display}>
          <h4> Prices below than: </h4>
          <button className={estilo.seleccionado}>{"$ " + price}</button> 
          
                      <button
                        onClick={() => (navigate(`/search?category=${category}&page=1&order=${order}`))}
                        className={estilo.deleteButton}
                      >
                      x
                      </button>
            </div>
            ) : null}
          
          
          <div className={estilo.display}>
              
              <button className={estilo.pagination} onClick={() => {navigate(getFilterUrl({page: 1}))}}> {`<<`} </button>
              <button className={estilo.pagination} onClick={() => {navigate(getFilterUrl({page: page - 1}))}}> {`<`} </button>
                {[...Array(pages).keys()].map((x) => (
                  <button
                    onClick={() => {navigate(getFilterUrl({ page: x + 1 }))}}
                    key={x + 1}
                    className={ x + 1 === page ? estilo.seleccionado : estilo.pagination  }
                  >
                    
                      {x + 1}
                    </button>
                  
                )).slice(ini,fin)}
              <button className={estilo.pagination} onClick={() => {navigate(getFilterUrl({page: (Number(page) + 1 <= fin) ? Number(page) + 1 : fin}))}}> {`>`} </button>
              <button className={estilo.pagination} onClick={() => {navigate(getFilterUrl({page: pages}))}}> {`>>`} </button>
          </div>
          
            <div className={estilo.grid}>
              {products?.map((product) => (
               
                  <Product products={product} key={product.id}/>
              
              ))}
            </div>
        </div>
  );

}
