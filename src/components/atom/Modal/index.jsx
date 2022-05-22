import * as React from "react";
import Box from "@mui/material/Box";

import { ModalSC, BoxSC, BoxSmall } from "./StyledComponents";

export default function ModalBasico({
  abrirModal = false,
  onCloseModal,
  props,
  children,
}) {
  function onModalClose(event) {
    let data = { name: "example", type: "closed from child" };
    onCloseModal(event, data);
  }

  return (
    <ModalSC
      open={abrirModal}
      onClose={onModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      {...props}
    >
      <BoxSC>{children}</BoxSC>
    </ModalSC>
  );
}
export function ModalSmall({
  abrirModal = false,
  onCloseModal,
  props,
  children,
}) {
  function onModalClose(event) {
    let data = { name: "example", type: "closed from child" };
    onCloseModal(event, data);
  }

  return (
    <ModalSC
      open={abrirModal}
      onClose={onModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      {...props}
    >
      <BoxSmall>{children}</BoxSmall>
    </ModalSC>
  );
}
