import React from "react";
import closeIcon from "../assets/img/Close.svg";

type ModalProps = {
  imageUrl: string;
  title: string;
  modalState: boolean;
  setModalState: (i: boolean) => void;
  types: number[];
  activeType: number;
  onClickType: (i: number) => void;
  typesNames: string[];
  sizes: number[];
  onClickSize: (i: number) => void;
  activeSize: number;
  prices: number[];
  addedCount: number;
  onClickAddPizza: () => void;
};
const Modal: React.FC<ModalProps> = ({
  imageUrl,
  title,
  modalState,
  setModalState,
  types,
  activeType,
  onClickType,
  typesNames,
  sizes,
  onClickSize,
  activeSize,
  prices,
  addedCount,
  onClickAddPizza,
}) => {
  return (
    <div className={`${modalState ? "modal_visible" : "modal"}`}>
      <img
        className="modal__close-icon"
        src={closeIcon}
        alt="close"
        onClick={() => setModalState(false)}
      ></img>
      <img className="modal__image" src={imageUrl} alt={imageUrl}></img>
      <h4 className="modal__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, index) => (
            <li
              onClick={() => onClickType(index)}
              className={activeType === index ? "active" : "active_hidden"}
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
              className={activeSize === index ? "active" : "active_hidden"}
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
  );
};

export default Modal;
