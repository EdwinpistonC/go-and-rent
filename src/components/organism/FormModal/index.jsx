import * as React from "react";
import ModalBasico from "components/atom/Modal";
import { useInputFormHook } from "Hooks/Inputhooks";
import {
  FormTextfield,
  PasswordTextfield,
  DatePicker,
} from "components/atom/Textfield";
import { Button } from "components/atom/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useLocalStorage } from "Hooks/LocalStoreHook";
import { useNavigate } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Avatar from "@mui/material/Avatar";
import { green, pink, red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import { formatDate } from "components/util/functions";
import { Divider } from "@mui/material";
import {
  FormContainer,
  Columna,
  Subtitulo,
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
                .then((response, status) => {
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
            {apiError !== "" ? (
              <ErrorLabel>{apiError}</ErrorLabel>
            ) : (
              <EmptyLabel />
            )}
            <Pregunta
              onClick={(e) => {
                onOlvidaste();
                cerrarModal();
              }}
            >
              ¿Olvidaste la contraseña?
            </Pregunta>
            <BtnContainer>
              <Button type="submit" width={70}>
                Iniciar Sesion
              </Button>
            </BtnContainer>
            <Divider />
            <Divider />

            <Typography>Registrarse como</Typography>
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
                Húesped
              </Button>
            </BtnRow>
          </Form>
        </Columna>
        <Imagen rel="preload" />
      </FormContainer>
    </ModalBasico>
  );
}

export function RegistroHModal({
  abrirModal = false,
  onCloseModal,
  direction = "left",
  onPrincipal,
  cerrarModal,
  backTo,
}) {
  const [contrasena, setContrasena, contrasenaError, controlContrasena] =
    useInputFormHook({});

  const [nombre, setNombre, nombreError, controlNombre] = useInputFormHook({
    nombre: {
      msg: "El nombre es muy corto",
    },
    tamMin: 4,
  });
  const [alias, setAlias, aliasError, controlAlias] = useInputFormHook({
    alias: {
      msg: "El alias es incorrecto",
    },
  });
  const [email, setEmail, emailError, controlEmail] = useInputFormHook({
    email: {
      msg: "El formato de email es incorrecto",
    },
  });

  const [apellido, setApellido, apellidoError, controlApellido] =
    useInputFormHook({});

  const [telefono, setTelefono, telefonoError, controlTelefono] =
    useInputFormHook({});

  const [
    fechaNacimiento,
    setFechaNacimiento,
    fechaNacimientoError,
    controlFechaNacimiento,
  ] = useInputFormHook({});

  const [apiError, setApiError] = React.useState("");
  const navegar = useNavigate();

  const [avatar, setAvatar, avatarError, controlAvatar] = useInputFormHook({});

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
      <Columna>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onPrincipal(
              alias,
              nombre,
              apellido,
              contrasena,
              email,
              telefono,
              avatar,
              formatDate(fechaNacimiento)
            )
              .then((response) => {
                setApiError("");
                cerrarModal();
              })
              .catch((err) => {
                if (err.response.status == 401) {
                  setApiError("Datos incorrectos");
                }
              });
            return false;
          }}
        >
          <H1>Registro</H1>
          <Box sx={{ marginInline: "5%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              columns={12}
            >
              <Grid item xs={6}>
                <FormTextfield
                  id="alias"
                  onChange={(e) => {
                    setAlias(e.target.value);
                  }}
                  error={aliasError}
                  onBlur={controlAlias}
                  nombre="Alias"
                />
              </Grid>
              <Grid item xs={6}>
                <FormTextfield
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  error={emailError}
                  onBlur={controlEmail}
                  nombre="Correo electrónico"
                />
              </Grid>

              <Grid item xs={6}>
                <PasswordTextfield
                  id="contra"
                  onChange={(e) => {
                    setContrasena(e.target.value);
                  }}
                  onBlur={controlContrasena}
                  nombre="Contraseña"
                />
              </Grid>

              <Grid item xs={6}>
                <FormTextfield
                  id="nombre"
                  onChange={(e) => {
                    setNombre(e.target.value);
                  }}
                  error={nombreError}
                  onBlur={controlNombre}
                  nombre="Nombre"
                />
              </Grid>

              <Grid item xs={6}>
                <FormTextfield
                  id="apellido"
                  onChange={(e) => {
                    setApellido(e.target.value);
                  }}
                  error={apellidoError}
                  onBlur={controlApellido}
                  nombre="Apellido"
                />
              </Grid>

              <Grid item xs={6}>
                <FormTextfield
                  id="telefono"
                  onChange={(e) => {
                    setTelefono(e.target.value);
                  }}
                  error={telefonoError}
                  onBlur={controlTelefono}
                  nombre="Teléfono/Celular"
                />
              </Grid>

              <Grid item xs={6}>
                <DatePicker
                  label="Fecha de nacimiento"
                  fecha={fechaNacimiento}
                  onChange={(newValue) => {
                    setFechaNacimiento(newValue);
                  }}
                ></DatePicker>
              </Grid>

              <Grid item xs={6}>
                <IconButton onClick={() => setAvatar(1)}>
                  <Avatar
                    sx={{ bgcolor: green[500] }}
                    style={{
                      border: avatar == 1 ? "2px solid black" : "",
                    }}
                  >
                    <AssignmentIcon />
                  </Avatar>
                </IconButton>
                <IconButton onClick={() => setAvatar(2)}>
                  <Avatar
                    sx={{ bgcolor: pink[600] }}
                    style={{
                      border: avatar == 2 ? "2px solid black" : "",
                    }}
                  >
                    <AssignmentIcon />
                  </Avatar>
                </IconButton>
                <IconButton onClick={() => setAvatar(3)}>
                  <Avatar
                    sx={{ bgcolor: red[700] }}
                    style={{
                      border: avatar == 3 ? "2px solid black" : "",
                    }}
                  >
                    <AssignmentIcon />
                  </Avatar>
                </IconButton>
              </Grid>
              {apiError !== "" ? (
                <ErrorLabel>{apiError}</ErrorLabel>
              ) : (
                <EmptyLabel />
              )}
              <BtnContainer>
                <Button onClick={back} width={40}>
                  Iniciar Sesión
                </Button>

                <Button type="submit" width={40}>
                  Registrar
                </Button>
              </BtnContainer>
            </Grid>
          </Box>
        </Form>
      </Columna>
    </ModalBasico>
  );
}

export function RegistroAModal({
  abrirModal = false,
  onCloseModal,
  direction = "left",
  onPrincipal,
  cerrarModal,
  backTo,
  children,
}) {
  const [contrasena, setContrasena, contrasenaError, controlContrasena] =
    useInputFormHook({});

  const [nombre, setNombre, nombreError, controlNombre] = useInputFormHook({
    nombre: {
      msg: "El nombre es muy corto",
    },
    tamMin: 4,
  });
  const [alias, setAlias, aliasError, controlAlias] = useInputFormHook({
    alias: {
      msg: "El alias es incorrecto",
    },
  });
  const [email, setEmail, emailError, controlEmail] = useInputFormHook({
    email: {
      msg: "El formato de email es incorrecto",
    },
  });

  const [apellido, setApellido, apellidoError, controlApellido] =
    useInputFormHook({});

  const [telefono, setTelefono, telefonoError, controlTelefono] =
    useInputFormHook({});

  const [
    fechaNacimiento,
    setFechaNacimiento,
    fechaNacimientoError,
    controlFechaNacimiento,
  ] = useInputFormHook({});

  const [apiError, setApiError] = React.useState("");
  const navegar = useNavigate();

  const [avatar, setAvatar, avatarError, controlAvatar] = useInputFormHook({});
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
            <H1>Registro</H1>
            <Box sx={{ marginInline: "5%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                columns={12}
              >
                <Grid item xs={6}>
                  <FormTextfield
                    id="alias"
                    onChange={(e) => {
                      setAlias(e.target.value);
                    }}
                    error={aliasError}
                    onBlur={controlAlias}
                    nombre="Alias"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormTextfield
                    id="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    error={emailError}
                    onBlur={controlEmail}
                    nombre="Correo electrónico"
                  />
                </Grid>

                <Grid item xs={6}>
                  <PasswordTextfield
                    id="contra"
                    onChange={(e) => {
                      setContrasena(e.target.value);
                    }}
                    onBlur={controlContrasena}
                    nombre="Contraseña"
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormTextfield
                    id="nombre"
                    onChange={(e) => {
                      setNombre(e.target.value);
                    }}
                    error={nombreError}
                    onBlur={controlNombre}
                    nombre="Nombre"
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormTextfield
                    id="apellido"
                    onChange={(e) => {
                      setApellido(e.target.value);
                    }}
                    error={apellidoError}
                    onBlur={controlApellido}
                    nombre="Apellido"
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormTextfield
                    id="telefono"
                    onChange={(e) => {
                      setTelefono(e.target.value);
                    }}
                    error={telefonoError}
                    onBlur={controlTelefono}
                    nombre="Teléfono/Celular"
                  />
                </Grid>

                <Grid item xs={6}>
                  <DatePicker
                    label="Fecha de nacimiento"
                    fecha={fechaNacimiento}
                    onChange={(newValue) => {
                      setFechaNacimiento(newValue);
                    }}
                  ></DatePicker>
                </Grid>

                <Grid item xs={6}>
                  <IconButton onClick={() => setAvatar(1)}>
                    <Avatar
                      sx={{ bgcolor: green[500] }}
                      style={{
                        border: avatar == 1 ? "2px solid black" : "",
                      }}
                    >
                      <AssignmentIcon />
                    </Avatar>
                  </IconButton>
                  <IconButton onClick={() => setAvatar(2)}>
                    <Avatar
                      sx={{ bgcolor: pink[600] }}
                      style={{
                        border: avatar == 2 ? "2px solid black" : "",
                      }}
                    >
                      <AssignmentIcon />
                    </Avatar>
                  </IconButton>
                  <IconButton onClick={() => setAvatar(3)}>
                    <Avatar
                      sx={{ bgcolor: red[700] }}
                      style={{
                        border: avatar == 3 ? "2px solid black" : "",
                      }}
                    >
                      <AssignmentIcon />
                    </Avatar>
                  </IconButton>
                </Grid>
                {apiError !== "" ? (
                  <ErrorLabel>{apiError}</ErrorLabel>
                ) : (
                  <EmptyLabel />
                )}
                <BtnContainer>
                  <Button onClick={back} width={40}>
                    Iniciar Sesión
                  </Button>

                  <Button type="submit" width={40}>
                    Registrar
                  </Button>
                </BtnContainer>
              </Grid>
            </Box>
          </Form>
        </Columna>

        <Imagen rel="preload" direccion={direccion}>
          <Titulo left={left} right={right}>
            Anfitrion
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
