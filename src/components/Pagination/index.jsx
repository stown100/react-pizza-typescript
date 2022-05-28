import React from 'react';
import ReactPaginate from "react-paginate";
import style from './Pagination.module.scss';


function Pagination({ onChangePage, pizzas }) {
  return (
    <ReactPaginate
    className={style.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={e => onChangePage(e.selected + 1)}
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