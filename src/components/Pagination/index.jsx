import React from 'react';
import ReactPaginate from "react-paginate";
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice'

import style from './Pagination.module.scss';


function Pagination() {
  const dispatch = useDispatch()
  return (
    <ReactPaginate
    className={style.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={e => dispatch(setCurrentPage(e.selected + 1))}
      // Сколько элементов на странице
      pageRangeDisplayed={4}
      // Сколько страниц
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination;