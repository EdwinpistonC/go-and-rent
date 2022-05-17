import * as React from "react";
import Box from "@mui/material/Box";

import { ModalSC, BoxSC } from "./StyledComponents";

export default function ModalBasico({
  abrirModal = false,
  onAfterOpen,
  onCloseModal,
  children,
}) {
  function afterOpenModal(e) {
    onAfterOpen(e, "After Modal Opened");
  }

  function onModalClose(event) {
    let data = { name: "example", type: "closed from child" };
    onCloseModal(event, data);
  }

  return (
    <ModalSC
      open={abrirModal}
      onClose={onModalClose}
      onAfterOpen={(e) => afterOpenModal(e)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <BoxSC>{children}</BoxSC>
    </ModalSC>
  );
}
