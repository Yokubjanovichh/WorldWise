import { NavLink } from "react-router-dom";
import { Logo } from "./index";
import style from "./PageNav.module.css";
export default function PageNav() {
  return (
    <nav className={style.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink className={style.ctaLink} to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
