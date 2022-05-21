import React from "react";

import Logo from "components/atom/Logo";
import Busqueda from "components/atom/Busqueda";
import HeaderMenu from "components/molecule/HeaderMenu";
import { useNavigate } from "react-router-dom";

import { HeaderContainer } from "./StyledComponents";
import LoginModal from "components/organism/LoginModal";
import { useModalHook } from "Hooks/ModalHooks";
import { RegistroAlternativoModal } from "../RegistroModal";
import Api from "server/Api";

export default function Header() {
  const navegar = useNavigate();
  const backend = new Api();

  const [iniciarSesionH, abrirInicioH, cerrarInicioH, despuesInicioH] =
    useModalHook();

  const [registrarH, abrirRegistroH, cerrarRegistroH, despuesRegistroH] =
    useModalHook();

  const iniciarSesion = (usuario, contrasena) => {
    backend
      .login({
        email: usuario,
        password: contrasena,
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    navegar.call("rsdfgjousrdgfjonk");

    return false;
  };

  return (
    <HeaderContainer>
      <Logo />
      <Busqueda></Busqueda>
      <HeaderMenu onIniciar={abrirInicioH} onCrear={() => alert("click 2")}>
        {/* Huésped */}
        <LoginModal
          abrirModal={iniciarSesionH}
          cerrarModal={abrirInicioH}
          onCloseModal={cerrarInicioH}
          onAfterOpen={despuesInicioH}
          direction="lefsdsdt"
          onPrincipal={iniciarSesion}
          onOlvidaste={() => {
            navegar(`/dashboard`);
          }}
          onSecundario2={abrirRegistroH}
          nombreSec1="Anfitrion"
          nombreSec2="Registrarse"
          titulo="Huésped"
        ></LoginModal>
        <RegistroAlternativoModal
          abrirModal={registrarH}
          cerrarModal={abrirRegistroH}
          onCloseModal={cerrarRegistroH}
          onAfterOpen={despuesRegistroH}
          direction="right"
          backTo={abrirInicioH}
          onPrincipal={() => {}}
          titulo="Huésped"
        ></RegistroAlternativoModal>
      </HeaderMenu>
    </HeaderContainer>
  );
}
