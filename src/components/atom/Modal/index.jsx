import * as React from "react";
import Box from "@mui/material/Box";

import { ModalSC, BoxSC } from "./StyledComponents";

export default function ModalBasico({
  abrirModal = false,
  onCloseModal,
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
    >
      <BoxSC>{children}</BoxSC>
    </ModalSC>
  );
}
