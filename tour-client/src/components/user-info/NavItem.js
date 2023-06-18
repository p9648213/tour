export default function NavItem({ text, icon, active, ...rest }) {
  return (
    <li className={active ? "side-nav--active" : ""} {...rest}>
      <div>
        <svg>
          <use xlinkHref={`/img/icons.svg#icon-${icon}`}></use>
        </svg>
        {text}
      </div>
    </li>
  );
}
