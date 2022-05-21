import { useState } from "react";

export const useModalHook = () => {
  const [valor, setIniciarSesion] = useState(false);

  function visible() {
    setIniciarSesion(!valor);
  }

  function handleCloseModal(event, data) {
    console.log(event, data);
    setIniciarSesion(false);
  }

  function handleAfterOpen(event, data) {
    console.log(event, data);
  }
  return [valor, visible, handleCloseModal, handleAfterOpen];
};
