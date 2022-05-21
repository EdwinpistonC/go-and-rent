import React from "react";

import { MenuContainer, Item } from "./StyledComponents";

import { Alert, Messages } from "components/atom/Icon";

export default function HeaderMenu({
  children,
  onCrear,
  onIniciar,
  rol,
  alert = () => {
    alert("default");
  },
  messages = () => {
    alert("default");
  },
  onCerrar = () => {
    alert("default");
  },
  onPerfil = () => {
    alert("default");
  },
}) {
  console.log(rol == "ROLE_GUEST");
  if (rol == "ROLE_GUEST") {
    return (
      <MenuContainer>
        {children}
        <Alert />
        <Messages />
        <Item component="button" underline="hover" onClick={onPerfil}>
          Perfil
        </Item>
        <Item component="button" underline="hover" onClick={onCerrar}>
          Cerrar Sesión
        </Item>
      </MenuContainer>
    );
  } else if (rol == "admin") {
    return (
      <MenuContainer>
        {children}
        <Item component="button" underline="hover" onClick={onIniciar}>
          Perfil
        </Item>
        <Item component="button" underline="hover" onClick={onCrear}>
          Hazte una cuenta
        </Item>
      </MenuContainer>
    );
  }
  return (
    <MenuContainer>
      {children}
      <Item component="button" underline="hover" onClick={onIniciar}>
        Iniciar Sesión {rol}
      </Item>
      <Item component="button" underline="hover" onClick={onCrear}>
        Hazte una cuenta
      </Item>
    </MenuContainer>
  );
}
