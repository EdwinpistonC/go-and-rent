import React from "react";

import Logo from "components/atom/Logo";
import Busqueda from "components/atom/Busqueda";
import HeaderMenu from "components/molecule/HeaderMenu";

import { HeaderContainer } from "./StyledComponents";

export default function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <Busqueda></Busqueda>
      <HeaderMenu></HeaderMenu>
    </HeaderContainer>
  );
}
