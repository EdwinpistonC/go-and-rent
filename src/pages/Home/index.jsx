import React from "react";
import styled from "styled-components";

import Mapa from "components/atom/Mapa";
import CategoriaBox from "components/molecule/CategoriaBox";


const Container = styled("div")`
width: 90%;
`;

export default function HomePage() {
  return <Container>
    <CategoriaBox></CategoriaBox>

    {/* <Mapa></Mapa> */}
  </Container>;
}
