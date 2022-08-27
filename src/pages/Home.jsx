import React from "react";
import Categories from "../components/Categories";
import { Sort } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Preloader from "../components/Preloader/Preloader";
import Pagination from "../components/Pagination";

function Home({ items, isLoading }) {
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {/* Отрисовка пицц и пока они не загрузились, отрисовывается прелоадер*/}
        {isLoading === "error" ? (
          <div className="container container--cart">
            <div className="cart cart--empty">
              <h2>
                Пиццы не загрузились <icon>😕</icon>
              </h2>
              <p>Вероятней всего, ошибка на сервере. Повторите попытку позже</p>
            </div>
          </div>
        ) : (
          items.map((obj) => <PizzaBlock {...obj} key={obj.id} />)
        )}
        {isLoading === "Loading"
          ? [...new Array(12)].map(() => <Preloader key={Math.random()} />)
          : items.map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
      </div>
      <Pagination />
    </div>
  );
}

export default Home;
