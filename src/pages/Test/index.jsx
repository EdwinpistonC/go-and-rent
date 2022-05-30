import React from "react";
import styled from "styled-components";
import Api from "server/Api";
import   {  ListaUsuarios } from "components/molecule/ListaUsuarios";
import Mapa from "components/atom/Mapa";


const Container = styled("div")``;
const backend = new Api();
backend.listadoUsuarios()
   
backend.listadoUsuarios().then((response)=>{
 console.log(response.data)

})


console.log(backend.listadoUsuarios())
export default function TestPage() {
  return <Container>
      <ListaUsuarios/>

  </Container>;
}
