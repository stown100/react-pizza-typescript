import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  CartItem,
  selectCartItemById,
} from "../redux/slices/cartSlice";
import Modal from "./Modal";

type pizzaBlockProps = {
  id: number,
  imageUrl: string,
  title: string,
  types: number[],
  sizes: number[],
  prices: number[],
  category: number,
  rating: number,
}

const PizzaBlock: React.FC<pizzaBlockProps> = ({
  id,
  imageUrl,
  title,
  types,
  sizes,
  prices,
  category,
  rating,
}) => {
  const typesNames = ["Тонкое", "Традиционное"];

  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const [modal, setModal] = React.useState(false);
  const cartItem = useSelector(selectCartItemById(id));
  const dispatch = useDispatch();

  // Если пицц больше ноля, показываю число в кнопке "Добавить"
  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAddPizza = () => {
    const item: CartItem = {
      id,
      title,
      price: prices[activeSize],
      imageUrl,
      type: typesNames[activeType],
      size: sizes[activeSize],
      count: 0
    };
    dispatch(addItem(item));
  };

  // Выбор типа пиццы
  const onClickType = (index: number) => {
    setActiveType(index);
  };
  // Выбор размера пиццы
  const onClickSize = (index: number) => {
    setActiveSize(index);
  };

  // Закрытие попапа по ESC
  React.useEffect(() => {
    const closeByEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModal(false);
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);
  return (
    <>
      <div className="pizza-block">
        <img
          className={`${
            modal ? "pizza-block__image_open" : "pizza-block__image"
          }`}
          src={imageUrl}
          alt="Pizza"
          onClick={() => setModal(!modal)}
        />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type, index) => (
              <li
                onClick={() => onClickType(index)}
                className={activeType === index ? "active" : ""}
                key={type}
              >
                {typesNames[index]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                onClick={() => onClickSize(index)}
                className={activeSize === index ? "active" : ""}
                key={`${size}+${index}`}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          {activeSize === 0 ? (
            <div className="pizza-block__price">от {prices[0]} ₽</div>
          ) : activeSize === 1 ? (
            <div className="pizza-block__price">от {prices[1]} ₽</div>
          ) : (
            <div className="pizza-block__price">от {prices[2]} ₽</div>
          )}
          <button
            className="button button--outline button--add"
            onClick={onClickAddPizza}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>

      <Modal
        setModalState={setModal}
        modalState={modal}
        title={title}
        imageUrl={imageUrl}
        types={types}
        sizes={sizes}
        prices={prices}
        onClickType={onClickType}
        onClickSize={onClickSize}
        activeType={activeType}
        activeSize={activeSize}
        addedCount={addedCount}
        onClickAddPizza={onClickAddPizza}
        typesNames={typesNames}
      />
      <div
        className={`${modal ? "modal-background_visible" : "modal-background"}`}
        onClick={() => setModal(false)}
      ></div>
    </>
  );
}

export default PizzaBlock;
