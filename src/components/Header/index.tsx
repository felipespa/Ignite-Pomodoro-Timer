import { HeaderContainer } from "./styles";
import { Timer, Scroll } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <HeaderContainer>
      <span className="logo">Pomodoro Timer</span>

      <nav className="timer">
        <NavLink to={"/"}>
          <Timer size={24} />
        </NavLink>
      </nav>

      <nav>
        <NavLink to={"/history"}>
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
