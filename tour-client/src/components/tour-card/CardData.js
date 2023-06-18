export default function CardData({ text, icon }) {
  return (
    <div className="card__data">
      <svg className="card__icon">
        <use href={`/img/icons.svg#icon-${icon}`}></use>
      </svg>
      <span>{text}</span>
    </div>
  );
}
