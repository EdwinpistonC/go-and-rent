import * as React from "react";
import ModalBasico from "components/atom/Modal";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useInputFormHook } from "Hooks/Inputhooks";
import { FormTextfield, PasswordTextfield } from "components/atom/Textfield";

import {
  LoginContainer,
  Columna,
  Imagen,
  Titulo,
  Form,
  InputsContainer,
  H1,
  CustomOutilinedInput,
} from "./StyledComponents";
import TextField from "components/atom/Textfield";

export default function LoginModal({
  abrirModal = false,
  onAfterOpen,
  onCloseModal,
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

  return (
    <ModalBasico
      abrirModal={abrirModal}
      onCloseModal={() => {
        onCloseModal();
        setEmail("");
        setContrasena("");
      }}
      onAfterOpen={onAfterOpen}
    >
      <LoginContainer>
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
          </Form>
        </Columna>
        <Imagen>
          <Titulo>Huésped</Titulo>
        </Imagen>
      </LoginContainer>
    </ModalBasico>
  );
}
