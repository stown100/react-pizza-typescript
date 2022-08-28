import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSort, setCategoryId } from "../redux/slices/filterSlice";



const Categories: React.FC = () => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const dispatch = useDispatch()
  const { categoryId } = useSelector(selectSort);

    //При клике выбирается категория
    const onClickCategory = (index: number) => {
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
