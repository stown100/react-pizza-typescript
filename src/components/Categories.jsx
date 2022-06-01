import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";



function Categories() {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const dispatch = useDispatch()
  const { categoryId } = useSelector((state) => state.filterReducer);

    //При клике выбирается категория
    const onClickCategory = (index) => {
      dispatch(setCategoryId(index));
    };


  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            className={categoryId === index ? "active" : ""}
            onClick={() => onClickCategory(index)}
            key={`${item}+${index}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
