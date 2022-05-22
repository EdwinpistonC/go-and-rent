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

const registerAdmin = async function (usuario, contrasena) {
  const backend = new Api();
  return backend.adminCreate({
    email: usuario,
    password: contrasena,
  });
};

export default function AdminRegister() {
  return (
    <Container>
      <RegisterAdmin submit={registerAdmin} />{" "}
    </Container>
  );
}
