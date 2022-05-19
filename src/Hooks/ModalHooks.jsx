import { useState } from "react";

export const useModalHook = () => {
  const [valor, setIniciarSesion] = useState(false);

  function openFromParent() {
    setIniciarSesion(true);
  }

  function handleCloseModal(event, data) {
    console.log(event, data);
    setIniciarSesion(false);
  }

  function handleAfterOpen(event, data) {
    console.log(event, data);
  }
  return [valor, openFromParent, handleCloseModal, handleAfterOpen];
};
