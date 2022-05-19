import React from "react";

import Logo from "components/atom/Logo";
import Busqueda from "components/atom/Busqueda";
import HeaderMenu from "components/molecule/HeaderMenu";

import { HeaderContainer } from "./StyledComponents";
import LoginModal from "components/organism/LoginModal";
import { useModalHook } from "Hooks/ModalHooks";

export default function Header() {
  const [iniciarSesion, abrirInicio, cerrarInicio, despuesInicio] =
    useModalHook();
  const [registrar, abrirRegistrar, cerrarRegistrar, despuesRegistrar] =
    useModalHook();
  return (
    <HeaderContainer>
      <Logo />
      <Busqueda></Busqueda>
      <HeaderMenu onIniciar={abrirInicio} onCrear={abrirRegistrar}>
        <LoginModal
          abrirModal={iniciarSesion}
          onCloseModal={cerrarInicio}
          onAfterOpen={despuesInicio}
          direction="left"
        ></LoginModal>
        <LoginModal
          abrirModal={registrar}
          onCloseModal={cerrarRegistrar}
          onAfterOpen={despuesRegistrar}
          direction="right"
        ></LoginModal>
      </HeaderMenu>
    </HeaderContainer>
  );
}
