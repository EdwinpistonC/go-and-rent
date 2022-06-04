import React from "react";
import { BusquedaContainer, Input } from "./StyledComponents";

export default function Busqueda({ setInput, input }) {
  return (
    <BusquedaContainer>
      <Input
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></Input>
    </BusquedaContainer>
  );
}
