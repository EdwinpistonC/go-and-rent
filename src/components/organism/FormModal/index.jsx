import * as React from "react";
import ModalBasico from "components/atom/Modal";
import { useInputFormHook } from "Hooks/Inputhooks";
import { FormTextfield, PasswordTextfield } from "components/atom/Textfield";
import { Button } from "components/atom/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useLocalStorage } from "Hooks/LocalStoreHook";
import { useNavigate } from "react-router-dom";

import {
  FormContainer,
  Columna,
  Imagen,
  Titulo,
  Form,
  InputsContainer,
  H1,
  BtnContainer,
  Pregunta,
  ColumnaSecundaria,
  BtnRow,
  FilaRegistro,
  CustomSwitch,
  ErrorLabel,
  EmptyLabel,
} from "./StyledComponents";

export default function LoginModal({
  abrirModal = false,
  onCloseModal,
  onOlvidaste,
  onPrincipal,
  onSecundario1,
  onSecundario2,
  cerrarModal,
  setUsuario,
}) {
  const navegar = useNavigate();

  const [email, setEmail, emailError, controlEmail] = useInputFormHook({
    email: {
      msg: "El formato de email es incorrecto",
    },
  });

  const [contrasena, setContrasena, contrasenaError, controlContrasena] =
    useInputFormHook({});

  const [apiError, setApiError] = React.useState("");

  return (
    <ModalBasico
      abrirModal={abrirModal}
      onCloseModal={() => {
        onCloseModal();
        setEmail("");
        setContrasena("");
      }}
    >
      <FormContainer>
        <Columna>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              onPrincipal(email, contrasena)
                .then((response) => {
                  console.log(response);

                  setApiError("");

                  setUsuario(response.data);
                  cerrarModal();

                  navegar("/");
                })
                .catch((err) => {
                  if (err.response.status == 401) {
                    setApiError(
                      "Tu contraseña es incorrecta o la cuenta ingresada no existe"
                    );
                  }
                  console.log();
                });
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
            {apiError != "" ? (
              <ErrorLabel>{apiError}</ErrorLabel>
            ) : (
              <EmptyLabel />
            )}
            <BtnContainer>
              <Button type="submit" width={70}>
                Iniciar Sesion
              </Button>
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
                Anfitrion
              </Button>
              <Button
                onClick={() => {
                  onSecundario2();
                  cerrarModal();
                }}
              >
                Registrarse
              </Button>
            </BtnRow>
          </Form>
        </Columna>
        <Imagen rel="preload" />
      </FormContainer>
    </ModalBasico>
  );
}

export function RegistroModal({
  abrirModal = false,
  onCloseModal,
  direction = "left",
  onPrincipal,
  titulo,
  cerrarModal,
  backTo,
  children,
}) {
  const arrayChildren = React.Children.toArray(children);

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

  const back = () => {
    backTo(true);

    cerrarModal(false);
  };

  //CSS
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
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Off</Typography>
        <CustomSwitch
          defaultChecked
          inputProps={{ "aria-label": "ant design" }}
        />
        <Typography>Ondfdfdfdf</Typography>
      </Stack>

      <FormContainer posImagen={posImagen}>
        <Columna>
          <Form action="/" method="POST" onSubmit={onPrincipal}>
            <H1>Login</H1>
            <FilaRegistro>
              <ColumnaSecundaria>
                <FormTextfield
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  error={emailError}
                  onBlur={controlEmail}
                  nombre="Correo electronico"
                ></FormTextfield>
                <FormTextfield
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  error={emailError}
                  onBlur={controlEmail}
                  nombre="Correo electronico"
                ></FormTextfield>
                <FormTextfield
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  error={emailError}
                  onBlur={controlEmail}
                  nombre="Correo electronico"
                ></FormTextfield>
              </ColumnaSecundaria>
              <ColumnaSecundaria>
                <FormTextfield
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  error={emailError}
                  onBlur={controlEmail}
                  nombre="Correo electronico"
                ></FormTextfield>
                <FormTextfield
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  error={emailError}
                  onBlur={controlEmail}
                  nombre="Correo electronico"
                ></FormTextfield>
                <FormTextfield
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  error={emailError}
                  onBlur={controlEmail}
                  nombre="Correo electronico"
                ></FormTextfield>
              </ColumnaSecundaria>
            </FilaRegistro>

            <BtnContainer>
              <Button onClick={back} width={40}>
                Volver
              </Button>

              <Button type="submit" width={40}>
                Registrar
              </Button>
            </BtnContainer>
          </Form>
        </Columna>

        <Imagen rel="preload" direccion={direccion}>
          <Titulo left={left} right={right}>
            {titulo}
          </Titulo>
        </Imagen>
      </FormContainer>
    </ModalBasico>
  );
}

export function CambioCModal({
  abrirModal = false,
  onCloseModal,
  direction = "left",
  onPrincipal,
  titulo = "default",
  tituloLateral = "default",
  cerrarModal,
  backTo,
  children,
}) {
  const arrayChildren = React.Children.toArray(children);

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

  const back = () => {
    backTo(true);

    cerrarModal(false);
  };

  //CSS
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
      <FormContainer posImagen={posImagen}>
        <Columna>
          <Form action="/" method="POST" onSubmit={onPrincipal}>
            <H1>{titulo}</H1>
            {React.Children.map(arrayChildren, (child, index) => {
              return child;
            })}
            <BtnContainer>
              <Button onClick={back}>Volver</Button>

              <Button type="submit">Iniciar Sesion</Button>
            </BtnContainer>
          </Form>
        </Columna>
        <Imagen rel="preload" direccion={direccion}>
          <Titulo left={left} right={right}>
            {tituloLateral}
          </Titulo>
        </Imagen>
      </FormContainer>
    </ModalBasico>
  );
}
