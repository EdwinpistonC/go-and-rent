import React from "react";
import styled from "styled-components";
import Api from "server/Api";

import RegisterAdmin from "../../components/organism/RegisterAdmin";

const Container = styled("div")`
  width: 100%;
  height: 100%;
  display: block;
  min-height: 100%;
  height: auto !important;
  height: 100%;
  /* margin: 0 auto -100px; */
  margin: auto;
`;

const registerAdmin = async function (
  alias,
  nombre,
  apellido,
  password,
  email,
  telefono,
  avatar,
  fechaNacimiento
) {
  const backend = new Api();
  const objeto = {
    alias: alias,
    email: email,
    password: password,
    name: nombre,
    lastName: apellido,
    phone: telefono,
    birthday: fechaNacimiento,
    picture: avatar,
  };
  console.log(objeto);
  return backend.adminCreate({
    alias: alias,
    email: email,
    password: password,
    name: nombre,
    lastName: apellido,
    phone: telefono,
    birthday: fechaNacimiento,
    picture: avatar,
  });
};

export default function AdminRegister() {
  return (
    <Container>
      <RegisterAdmin submit={registerAdmin} />{" "}
    </Container>
  );
}
