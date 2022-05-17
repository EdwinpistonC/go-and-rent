import React from "react";

import LoginModal from "components/organism/LoginModal";

import { MenuContainer, Item } from "./StyledComponents";

export default function HeaderMenu() {
  const [abrirModal, setAbrirModal] = React.useState(false);

  function openFromParent() {
    setAbrirModal(true);
  }

  function handleCloseModal(event, data) {
    console.log(event, data);
    setAbrirModal(false);
  }

  function handleAfterOpen(event, data) {
    console.log(event, data);
  }

  return (
    <MenuContainer>
      <LoginModal
        abrirModal={abrirModal}
        onCloseModal={handleCloseModal}
        onAfterOpen={handleAfterOpen}
      ></LoginModal>
      <Item component="button" underline="hover" onClick={openFromParent}>
        Hazte una cuenta
      </Item>
      <Item component="button" underline="hover" onClick={openFromParent}>
        Iniciar Sesión
      </Item>
    </MenuContainer>
  );
}
