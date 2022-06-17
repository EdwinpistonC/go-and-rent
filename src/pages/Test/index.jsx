import React from "react";
import styled from "styled-components";
import Api from "server/Api";
import   {  ListaUsuarios } from "components/molecule/ListaUsuarios";
import Mapa from "components/atom/Mapa";
//import Usuarios from "./users.json"

import { useState, useEffect } from "react";

const Container = styled("div")``;
const backend = new Api();
//let listaDeUsuarios = backend.listadoUsuarios()

//console.log(Usuarios["usuarios"]);
/*backend.listadoUsuarios().then((response)=>{
 console.log(response.data)

})
*/


//console.log(backend.listadoUsuarios())
export default function TestPage() {
  const [usuarios, setUsuarios] = useState([]);


  const getData = async () => {
    await backend.listadoUsuarios().then((response)=>{
      console.log(response.data["usuarios"])
      setUsuarios(response.data["usuarios"])
     })
  };
  
   useEffect(() => {
    getData()
  }, []);
  return <Container>
      <ListaUsuarios 
      datos={usuarios} />

  </Container>;
}
