import React from "react";

function Categories({ categoryId, onClickCategory }) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

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
