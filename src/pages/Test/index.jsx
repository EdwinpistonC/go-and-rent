import React from "react";
import styled from "styled-components";
import Api from "server/Api";
import   {  ListaUsuarios } from "components/molecule/ListaUsuarios";
import Mapa from "components/atom/Mapa";
import Usuarios from "./users.json"


const Container = styled("div")``;
const backend = new Api();
//let listaDeUsuarios = backend.listadoUsuarios()

console.log(Usuarios["usuarios"]);
backend.listadoUsuarios().then((response)=>{
 console.log(response.data)

})


//console.log(backend.listadoUsuarios())
export default function TestPage() {
  return <Container>
      <ListaUsuarios 
      datos={Usuarios["usuarios"]} />

  </Container>;
}
