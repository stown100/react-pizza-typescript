import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSort, setSearch } from "../../redux/slices/filterSlice";
import style from "./Search.module.scss";

function Search() {
  const { search } = useSelector(selectSort);
  const dispatch = useDispatch();
  
  return (
    <input
      onChange={(e) => dispatch(setSearch(e.target.value))}
      value={search}
      className={style.root}
      placeholder="поиск пиццы..."
    />
  );
}

export default Search;
