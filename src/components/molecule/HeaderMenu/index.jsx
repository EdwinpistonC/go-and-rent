import React from "react";

import { MenuContainer, Item } from "./StyledComponents";

export default function HeaderMenu({ children, onCrear, onIniciar }) {
  return (
    <MenuContainer>
      {children}
      <Item component="button" underline="hover" onClick={onIniciar}>
        Iniciar Sesión
      </Item>
      <Item component="button" underline="hover" onClick={onCrear}>
        Hazte una cuenta
      </Item>
    </MenuContainer>
  );
}
