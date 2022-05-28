import React from 'react';
import style from './Search.module.scss'

function Search({ search, setSearch }) {
  return (
    <input onChange={e => setSearch(e.target.value)} value={search} className={style.root} placeholder='поиск пиццы...' />
  )
}

export default Search