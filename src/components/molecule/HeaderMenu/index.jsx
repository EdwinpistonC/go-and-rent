import React from "react";

import { MenuContainer, Item } from "./StyledComponents";

import { Alert, Messages, Bookings } from "components/atom/Icon";

import { Box } from "@mui/system";
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
        <Bookings />

        <Item component="button" underline="hover" onClick={onPerfil}>
          Perfil
        </Item>
        <Item component="button" underline="hover" onClick={onCerrar}>
          Cerrar Sesión
        </Item>
      </MenuContainer>
    );
  } else if (rol == "ROLE_ADMIN") {
    return <Box style={{ flex: "none", order: 2, flexGrow: 1 }} />;
  } else if (rol == "ROLE_HOST") {
    return (
      <MenuContainer>
        <Alert />
        <Messages />
        <Bookings />
        <Item component="button" underline="hover" onClick={onPerfil}>
          Perfil
        </Item>
        <Item component="button" underline="hover" onClick={onCerrar}>
          Cerrar Sesión
        </Item>
        {children}
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
