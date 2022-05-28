import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Preloader from "../components/Preloader/Preloader";
import Pagination from "../components/Pagination";

function Home({
  items,
  isLoading,
  catIndex,
  setCatIndex,
  sortIndex,
  setSortIndex,
  pizzas,
  setCurrentPage,
}) {
  //При клике выбирается категория
  const onClickCategory = (index) => {
    setCatIndex(index);
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          catIndex={catIndex}
          setCatIndex={setCatIndex}
          onClickCategory={onClickCategory}
        />
        <Sort sortIndex={sortIndex} setSortIndex={setSortIndex} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {/* Отрисовка пицц и пока они не загрузились, отрисовывается прелоадер*/}
        {isLoading
          ? [...new Array(12)].map(() => <Preloader key={Math.random()} />)
          : pizzas.map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} pizzas={pizzas} />
    </div>
  );
}

export default Home;
