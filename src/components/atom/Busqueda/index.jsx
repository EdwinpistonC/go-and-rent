import React from "react";
import { BusquedaContainer, Input } from "./StyledComponents";
import { useGlobalState } from "Hooks/GlobalHook";
import { useLocation } from "react-router-dom";

export default function Busqueda() {

  const [state, dispatch] = useGlobalState();
  const location = useLocation();
  return (
    <BusquedaContainer>
      <Input
        fullWidth
        value={state.busqueda}
        onChange={(e) => {
          alert("modifica");

          dispatch({ busqueda: e.target.value });
          if (location.pathname != "/busqueda") {
            alert("entra");
          }
        }} //setInput(e.target.value)}
      ></Input>

    </BusquedaContainer>
  );
}
