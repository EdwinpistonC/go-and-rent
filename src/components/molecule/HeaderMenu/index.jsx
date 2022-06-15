import React from "react";

import { MenuContainer, Item } from "./StyledComponents";

import { Alert, Messages, Bookings } from "components/atom/Icon";

import { Box } from "@mui/system";
export default function HeaderMenu({
  children,
  onCrear,
  onIniciar,
  rol,

  messages = () => {
    alert("default");
  },
  onCerrar = () => {
    alert("default");
  },
  onPerfil = () => {
    alert("default");
  },
  onReserva = () => {
    alert("default");
  },
}) {
  if (rol == "ROLE_GUEST") {
    return (
      <MenuContainer>
        {children}
        <Alert />
        <Messages />
        <Bookings onClick={onReserva} />
        <Item component="button" underline="hover" onClick={onPerfil}>
          Perfil
        </Item>
        <Item component="button" underline="hover" onClick={onCerrar}>
          Cerrar Sesión
        </Item>
      </MenuContainer>
    );
  } else if (rol == "ROLE_ADMIN") {
    return (
      <Box
        style={{
          flex: "none",
          order: 2,
          flexGrow: 1,
          justifyContent: "right",
          display: "flex",
          marginRight: "5%",
        }}
      >
        <Item component="button" underline="hover" onClick={onCerrar}>
          Cerrar Sesión
        </Item>
      </Box>
    );
  } else if (rol == "ROLE_HOST") {
    return (
      <MenuContainer>
        <Alert />
        <Messages />
        <Bookings onClick={onReserva} />
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
        Iniciar Sesión
      </Item>
      <Item component="button" underline="hover" onClick={onCrear}>
        Hazte una cuenta
      </Item>
    </MenuContainer>
  );
}
