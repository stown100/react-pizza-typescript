import React from 'react';
import { SearchContext } from '../../App';
import style from './Search.module.scss'

function Search() {
  // Достаю переменные из контекста
  const { searchValue, setSearchValue } = React.useContext(SearchContext)
  return (
    <input onChange={e => setSearchValue(e.target.value)} value={searchValue} className={style.root} placeholder='поиск пиццы...' />
  )
}

export default Search