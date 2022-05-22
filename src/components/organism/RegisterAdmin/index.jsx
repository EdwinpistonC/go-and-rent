import React from "react";
import Textfield, {FormTextfield, PasswordTextfield} from "components/atom/Textfield";
import { Form, InputsContainer } from "../FormModal/StyledComponents";
import { useInputFormHook } from "../../../Hooks/Inputhooks";
import { Button } from "../../atom/Button";
import {Grid} from "@mui/material";
import {Item} from "../../molecule/HeaderMenu/StyledComponents";

export default function RegisterAdmin({ submit }) {
  const [password, setContrasena, passwordError, controlContrasena] = useInputFormHook({
    password: {
      msg: "El formato de email es incorrecto",
    },
    tamMin: 6
  });
  const [nombre, setNombre, nombreError, controlNombre] = useInputFormHook({
    nombre: {
      msg: "El nombre es muy corto",
    },
    tamMin: 4
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

  const [apellido, setApellido, apellidoError, controlApellido] = useInputFormHook({
  });

  const [telefono, setTelefono, telefonoError, controlTelefono] = useInputFormHook({
  });

  const [fechaNacimiento, setFechaNacimiento, fechaNacimientoError, controlFechaNacimiento] = useInputFormHook({
  });

  const [avatar, setAvatar, avatarError, controlAvatar] = useInputFormHook({
  });

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Item>
          <Form onSubmit={submit}>
            <InputsContainer>
              <FormTextfield
                  id="alias"
                  onChange={(e) => {
                    setAlias(e.target.value);
                  }}
                  error={aliasError}
                  onBlur={controlAlias}
                  nombre="Alias"
              />
              <FormTextfield
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  error={emailError}
                  onBlur={controlEmail}
                  nombre="Correo electrónico"
              />
              <PasswordTextfield
                  id="password"
                  onChange={setContrasena}
                  onBlur={controlContrasena}
                  nombre="Contraseña"
              />
              <FormTextfield
                  id="nombre"
                  onChange={(e) => {
                    setNombre(e.target.value);
                  }}
                  error={nombreError}
                  onBlur={controlNombre}
                  nombre="Nombre"
              />
              <FormTextfield
                  id="apellido"
                  onChange={(e) => {
                    setApellido(e.target.value);
                  }}
                  error={apellidoError}
                  onBlur={controlApellido}
                  nombre="Apellido"
              />
              <FormTextfield
                  id="telefono"
                  onChange={(e) => {
                    setTelefono(e.target.value);
                  }}
                  error={telefonoError}
                  onBlur={controlTelefono}
                  nombre="Teléfono/Celular"
              />
              <FormTextfield
                  id="fechaNacimiento"
                  onChange={(e) => {
                    setFechaNacimiento(e.target.value);
                  }}
                  error={fechaNacimientoError}
                  onBlur={controlFechaNacimiento}
                  nombre="Fecha de Nacimiento"
              />
              <FormTextfield
                  id="avatar"
                  onChange={(e) => {
                    setAvatar(e.target.value);
                  }}
                  error={avatarError}
                  onBlur={controlAvatar}
                  nombre="Avatar"
              />
              <Button size="ultrasmall" type="submit">Crear Admin</Button>
            </InputsContainer>
          </Form>
        </Item>
      </Grid>
    </>
  );
}
