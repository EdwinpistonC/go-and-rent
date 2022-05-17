import React from "react";
import ModalBasico from "components/atom/Modal";

import { LoginContainer, Columna, Imagen, SvgImg } from "./StyledComponents";

export default function LoginModal({
  abrirModal = false,
  onAfterOpen,
  onCloseModal,
}) {
  return (
    <ModalBasico
      abrirModal={abrirModal}
      onCloseModal={onCloseModal}
      onAfterOpen={onAfterOpen}
    >
      <Columna></Columna>
      <Imagen>
        <SvgImg />
      </Imagen>
    </ModalBasico>
  );
}
