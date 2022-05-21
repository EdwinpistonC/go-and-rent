import * as React from "react";
import ModalBasico from "components/atom/Modal";
import { useInputFormHook } from "Hooks/Inputhooks";
import { FormTextfield, PasswordTextfield } from "components/atom/Textfield";
import { Button } from "components/atom/Button";

import {
  RegistroContainer,
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

/*
En este componente recibimos los inputs a ingresar para poder ingresarlos ya que segun el tipo de usuario varían la cantidad
*/
export default function RegistroModal({
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
      <RegistroContainer posImagen={posImagen}>
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
      </RegistroContainer>
    </ModalBasico>
  );
}

function RegistroAlternativoModal({
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
      hola
      <RegistroContainer posImagen={posImagen}>
        <Columna>
          <Form action="/" method="POST" onSubmit={onPrincipal}>
            <H1>Login</H1>
            {React.Children.map(arrayChildren, (child, index) => {
              return child;
            })}
            <BtnContainer>
              <Button onClick={back}>Voldfdfdfdfdfver</Button>

              <Button type="submit">Iniciar Sesion</Button>
            </BtnContainer>
          </Form>
        </Columna>
        <Columna>
          <Form action="/" method="POST" onSubmit={onPrincipal}>
            <H1>Login</H1>
            {React.Children.map(arrayChildren, (child, index) => {
              return child;
            })}
            <BtnContainer>
              <Button onClick={back}>Volver</Button>

              <Button type="submit">Iniciar Sesion</Button>
            </BtnContainer>
          </Form>
        </Columna>
      </RegistroContainer>
    </ModalBasico>
  );
}
export { RegistroAlternativoModal };
