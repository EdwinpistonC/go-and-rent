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

  console.log(emailError);
  const [contrasena, setContrasena, contrasenaError, controlContrasena] =
    useInputFormHook({});
  let left = 0;
  let right = 0;
  let direccion = "alternate";
  let posImagen;

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
          <Form>
            <H1>Login</H1>
            <InputsContainer>
              <FormTextfield
                id="email"
                onChange={setEmail}
                error={emailError}
                onBlur={controlEmail}
                nombre="Correo electronico"
              ></FormTextfield>
              <PasswordTextfield
                id="contra"
                onChange={setContrasena}
                onBlur={controlContrasena}
                nombre="Contraseña"
              />
            </InputsContainer>
            <BtnContainer>
              <Button>Boton</Button>
            </BtnContainer>
            <Pregunta>¿Olvidaste la contraseña ?</Pregunta>
            <BtnRow>
              <Button>Boton</Button> <Button>Boton</Button>
            </BtnRow>
          </Form>
        </Columna>
        <Imagen rel="preload" direccion={direccion}>
          <Titulo left={left} right={right}>
            Huésped
          </Titulo>
        </Imagen>
      </LoginContainer>
    </ModalBasico>
  );
}
