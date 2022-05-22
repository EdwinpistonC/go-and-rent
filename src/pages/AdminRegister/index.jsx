import React from "react";
import styled from "styled-components";
import Api from "server/Api";

import RegisterAdmin from "../../components/organism/RegisterAdmin";

const Container = styled("div")`
  height: 100vh;
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
                <RegisterAdmin submit={registerAdmin} />
            </Container>
    );
}
