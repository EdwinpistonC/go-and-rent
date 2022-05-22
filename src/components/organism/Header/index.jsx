import React from "react";

import Logo from "components/atom/Logo";
import Busqueda from "components/atom/Busqueda";
import HeaderMenu from "components/molecule/HeaderMenu";
import { useNavigate } from "react-router-dom";

import { HeaderContainer } from "./StyledComponents";
import { useModalHook } from "Hooks/ModalHooks";
import LoginModal, { RegistroModal, CambioCModal } from "../FormModal";
import Api from "server/Api";
import { useLocalStorage } from "Hooks/LocalStoreHook";

export default function Header() {
  const navegar = useNavigate();
  const backend = new Api();

  const [usuario, setUsuario] = useLocalStorage("usuario", "");

  const [iniciarSesionH, abrirInicioH, cerrarInicioH, despuesInicioH] =
    useModalHook();

  const [registrarH, abrirRegistroH, cerrarRegistroH, despuesRegistroH] =
    useModalHook();
  const [cambiarContra, abrirCambiarCH, cerrarCambiarCH, despuesCambiarCH] =
    useModalHook();

  const iniciarSesion = async function (usuario, contrasena) {
    return backend.login({
      email: usuario,
      password: contrasena,
    });
  };

  return (
    <HeaderContainer>
      <Logo />
      <Busqueda></Busqueda>
      <HeaderMenu
        rol={usuario.rol}
        onIniciar={abrirInicioH}
        onCrear={() => alert("click 2")}
        onCerrar={() => setUsuario("")}
        onPerfil
      >
        {/* Huésped */}
        <LoginModal
          abrirModal={iniciarSesionH}
          cerrarModal={abrirInicioH}
          onCloseModal={cerrarInicioH}
          onAfterOpen={despuesInicioH}
          direction="lefsdsdt"
          onPrincipal={iniciarSesion}
          onOlvidaste={abrirCambiarCH}
          onSecundario2={abrirRegistroH}
          titulo="Huésped"
          setUsuario={setUsuario}
        ></LoginModal>
        <RegistroModal
          abrirModal={registrarH}
          cerrarModal={abrirRegistroH}
          onCloseModal={cerrarRegistroH}
          onAfterOpen={despuesRegistroH}
          direction="right"
          backTo={abrirInicioH}
          onPrincipal={() => {}}
          titulo="Huésped"
        ></RegistroModal>
        {/* Cambio de contraseña */}
        <CambioCModal
          abrirModal={cambiarContra}
          cerrarModal={abrirCambiarCH}
          onCloseModal={cerrarCambiarCH}
          onAfterOpen={despuesCambiarCH}
          backTo={iniciarSesionH}
          onPrincipal={() => {}}
          titulo="Recuperar contraseña"
          tituloLateral=""
        ></CambioCModal>
      </HeaderMenu>
    </HeaderContainer>
  );
}
