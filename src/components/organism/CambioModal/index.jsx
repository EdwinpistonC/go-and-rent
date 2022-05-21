import * as React from "react";
import ModalBasico from "components/atom/Modal";
import { useInputFormHook } from "Hooks/Inputhooks";
import { FormTextfield, PasswordTextfield } from "components/atom/Textfield";
import { Button } from "components/atom/Button";

import {
  LoginContainer,
  Columna,
  Imagen,
  Titulo,
  Form,
  InputsContainer,
  H1,
  BtnContainer,
  Pregunta,
  BtnRow,
} from "./StyledComponents";

export default function LoginModal({
  abrirModal = false,
  onCloseModal,
  direction = "left",
  onOlvidaste,
  onPrincipal,
  onSecundario1,
  onSecundario2,
  nombreSec1 = "default 1",
  nombreSec2 = "default 2",
  titulo,
  cerrarModal,
}) {
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const [email, setEmail, emailError, controlEmail] = useInputFormHook({
    email: {
      msg: "El formato de email es incorrecto",
    },
  });

  const [contrasena, setContrasena, contrasenaError, controlContrasena] =
    useInputFormHook({});
  let left = 0;
  let right = 0;
  let direccion = "alternate";
  let posImagen;

  let velocidad = 12312;

  if (direction == "left") {
    posImagen = "row";
    right = 4;
    left = "sds";

    direccion = "alternate-reverse";
  } else {
    posImagen = "row-reverse";
    left = 4;
    right = "sds";
  }
  return (
    <ModalBasico
      abrirModal={abrirModal}
      onCloseModal={() => {
        onCloseModal();
        setEmail("");
        setContrasena("");
      }}
    >
      <LoginContainer posImagen={posImagen}>
        <Columna>
          <Form
            onSubmit={(e) => {
              e.preventDefault();

              onPrincipal(email, contrasena);
              return false;
            }}
          >
            <H1>Login</H1>
            <InputsContainer>
              <FormTextfield
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                error={emailError}
                onBlur={controlEmail}
                nombre="Correo electronico"
              ></FormTextfield>
              <PasswordTextfield
                id="contra"
                onChange={(e) => {
                  setContrasena(e.target.value);
                }}
                onBlur={controlContrasena}
                nombre="Contraseña"
              />
            </InputsContainer>
            <BtnContainer>
              <Button type="submit">Iniciar Sesion</Button>
            </BtnContainer>
            <Pregunta
              onClick={(e) => {
                onOlvidaste();
                cerrarModal();
              }}
            >
              ¿Olvidaste la contraseña?
            </Pregunta>
            <BtnRow>
              <Button
                onClick={() => {
                  onSecundario1();
                  cerrarModal();
                }}
              >
                {nombreSec1}
              </Button>
              <Button
                onClick={() => {
                  onSecundario2();
                  cerrarModal();
                }}
              >
                {nombreSec2}
              </Button>
            </BtnRow>
          </Form>
        </Columna>
        <Imagen rel="preload" direccion={direccion}>
          <Titulo left={left} right={right}>
            {titulo}
          </Titulo>
        </Imagen>
      </LoginContainer>
    </ModalBasico>
  );
}
