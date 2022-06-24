import React, { useState } from 'react';
import style from './SearchBox.module.css';
import { useNavigate } from 'react-router-dom';
import { BiSearchAlt2 } from 'react-icons/bi';



export default function SearchBox() {
    const navigate = useNavigate();

    const [query, setQuery] = useState('');


    const handlerSubmit = (e) => {
        e.preventDefault();
        navigate(query ? `/search?query=${query}` : '/search');
        setQuery("")
    };


    return (
        < >
        <form onSubmit={handlerSubmit} className={style.searchDiv}>
            <input
                className={style.searchInput}
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                autoComplete='off'
                placeholder='Search product...'
                id="search"
                type="search"
                required />
            <button className={style.buttonSearch}><BiSearchAlt2 className={style.buttonIcon}/></button>
        </form>

        </>
    );
}
