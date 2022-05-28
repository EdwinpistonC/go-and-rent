import React from "react";
import styled from "styled-components";

import ListaUsuarios from "components/molecule/ListaUsuarios";
import Mapa from "components/atom/Mapa";

const Container = styled("div")``;

export default function TestPage() {
  return <Container>
      <ListaUsuarios></ListaUsuarios>
  </Container>;
}
