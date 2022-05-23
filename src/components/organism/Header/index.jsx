import React from "react";

import Logo from "components/atom/Logo";
import Busqueda from "components/atom/Busqueda";
import HeaderMenu from "components/molecule/HeaderMenu";
import { useNavigate } from "react-router-dom";

import { HeaderContainer } from "./StyledComponents";
import { useModalHook } from "Hooks/ModalHooks";
import LoginModal, {
  RegistroHModal,
  RegistroAModal,
  CambioCModal,
} from "../FormModal";
import Api from "server/Api";
import { useLocalStorage } from "Hooks/LocalStoreHook";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { ModalSmall } from "components/atom/Modal";

const registerH = async function (
  alias,
  nombre,
  apellido,
  password,
  email,
  telefono,
  avatar,
  fechaNacimiento
) {
  const backend = new Api();
  const objeto = {
    alias: alias,
    email: email,
    password: password,
    name: nombre,
    lastName: apellido,
    phone: telefono,
    birthday: fechaNacimiento,
    picture: avatar,
  };
  return backend.hostCreate({
    alias: alias,
    email: email,
    password: password,
    name: nombre,
    lastName: apellido,
    phone: telefono,
    birthday: fechaNacimiento,
    picture: avatar,
  });
};

export default function Header() {
  const navegar = useNavigate();
  const backend = new Api();
  /* 
  Cerrar sesion
  */
  const [alertaCerrarSesion, setAlerta] = React.useState(false);
  const handleOpen = () => setAlerta(true);
  const handleClose = () => setAlerta(false);

  const [usuario, setUsuario] = useLocalStorage("usuario", "");

  const [iniciarSesionH, abrirInicioH, cerrarInicioH, despuesInicioH] =
    useModalHook();

  const [registrarH, abrirRegistroH, cerrarRegistroH, despuesRegistroH] =
    useModalHook();
  const [registrarA, abrirRegistroA, cerrarRegistroA, despuesRegistroA] =
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
        onCrear={abrirRegistroH}
        onCerrar={handleOpen}
        onPerfil
      >
        {/* Cerrar sesion */}
        <ModalSmall abrirModal={alertaCerrarSesion} onCloseModal={handleClose}>
          <Stack spacing={2} direction="column">
            <label>¿Desea cerrar sesión?</label>
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                onClick={() => {
                  handleClose();
                  setUsuario("");
                }}
              >
                Si
              </Button>
              <Button variant="contained" onClick={handleClose}>
                No
              </Button>
            </Stack>
          </Stack>
        </ModalSmall>
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
        <RegistroAModal
          abrirModal={registrarA}
          cerrarModal={abrirRegistroA}
          onCloseModal={cerrarRegistroA}
          onAfterOpen={despuesRegistroA}
          direction="right"
          backTo={abrirInicioH}
          onPrincipal={() => {}}
        ></RegistroAModal>
        <RegistroHModal
          abrirModal={registrarH}
          cerrarModal={abrirRegistroH}
          onCloseModal={cerrarRegistroH}
          onAfterOpen={despuesRegistroH}
          direction="right"
          backTo={abrirInicioH}
          onPrincipal={registerH}
          titulo="Anfitrion"
        ></RegistroHModal>
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
