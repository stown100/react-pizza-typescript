import React from "react";
import Categories from "../components/Categories";
import { Sort } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Preloader from "../components/Preloader/Preloader";
import Pagination from "../components/Pagination";

type HomeProps = { items: any; isLoading: string };

const Home: React.FC<HomeProps> = ({ items, isLoading }) => {
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
                Пиццы не загрузились <span>😕</span>
              </h2>
              <p>Вероятней всего, ошибка на сервере. Повторите попытку позже</p>
            </div>
          </div>
        ) : isLoading === "success" && items.length === 0 ? (
          <div className="container container--cart">
            <div className="cart cart--empty">
              <h2>
                Такой пиццы у нас нет <span>😕</span>
              </h2>
              <p>Но есть лучше, полистайте каталог</p>
            </div>
          </div>
        ) : isLoading === "Loading" ? (
          [...new Array(12)].map(() => <Preloader key={Math.random()} />)
        ) : (
          items.map((obj: any, index: number) => <PizzaBlock {...obj} key={obj.id} />)
        )}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
