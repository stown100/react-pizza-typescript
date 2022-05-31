import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Preloader from "../components/Preloader/Preloader";
import Pagination from "../components/Pagination";

function Home({
  items,
  isLoading,
  categoryId,
  sort,
  pizzas,
  setCurrentPage,
  openPopup,
  setOpenPopup,
  handleSortItems,
  onClickCategory
}) {

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
        <Sort
          sort={sort}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          handleSortItems={handleSortItems}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {/* Отрисовка пицц и пока они не загрузились, отрисовывается прелоадер*/}
        {isLoading
          ? [...new Array(12)].map(() => <Preloader key={Math.random()} />)
          : pizzas.map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
      </div>
      <Pagination
        onChangePage={(number) => setCurrentPage(number)}
        pizzas={pizzas}
      />
    </div>
  );
}

export default Home;
