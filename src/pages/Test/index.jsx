import React from "react";
import styled from "styled-components";
import Api from "server/Api";
import { ListaUsuarios } from "components/molecule/ListaUsuarios";
//import Usuarios from "./users.json"
import botoneraEstados from "components/molecule/BotoneraEstados";
import { iconoEstados } from "components/atom/Icon";

import { useState, useEffect } from "react";

const Container = styled("div")``;
const backend = new Api();

/*backend.listadoUsuarios().then((response)=>{
 console.log(response.data)

})
*/

const emails = (email) => {
  return (
    <div
      style={{
        width: "10em",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      }}
    >
      {email}
    </div>
  );
};

const roles = {
  ROLE_GUEST: "HUÉSPED",
  ROLE_ADMIN: "ADMINISTRADOR",
  ROLE_HOST: "ANFITRIÓN",
};

//console.log(backend.listadoUsuarios())
export default function TestPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [cambioEstado, setcambioEstado] = useState(false);

  const actualizarTabla = () => {
    cambioEstado ? setcambioEstado(false) : setcambioEstado(true);
  };
  const getData = async () => {
    await backend.listadoUsuarios().then((response) => {
      let listaUsuarios = response.data["usuarios"];
      listaUsuarios.forEach(function (usuario, index) {
        let estado = usuario["status"];
        let aliasUsuario = usuario["alias"];
        let rol = usuario["role"];
        let email = usuario["email"];
        usuario["Action"] = botoneraEstados(
          estado,
          aliasUsuario,
          actualizarTabla
        );
        usuario["status"] = iconoEstados(estado);
        usuario["role"] = roles[rol];
        usuario["email"] = emails(email);
      });
      console.log(listaUsuarios);
      //setUsuarios(response.data["usuarios"])
      setUsuarios(listaUsuarios);
    });
  };

  useEffect(() => {
    console.log("ejecuto");
    getData();
  }, [cambioEstado]);
  return (
    <Container>
      <ListaUsuarios datos={usuarios} />
    </Container>
  );
}
