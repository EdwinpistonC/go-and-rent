import React from "react";
import Textfield, { PasswordTextfield } from "components/atom/Textfield";
import { Form, InputsContainer } from "../FormModal/StyledComponents";
import { useInputFormHook } from "../../../Hooks/Inputhooks";
import { Button } from "../../atom/Button";

export default function RegisterAdmin({ submit }) {
  console.log("HERE");
  const [setContrasena, controlContrasena] = useInputFormHook({});
  return (
    <>
      <Form>
        <InputsContainer>
          <Textfield label="Alias"></Textfield>
          <Textfield label="Email"></Textfield>
          <PasswordTextfield
            id="contra"
            onChange={setContrasena}
            onBlur={controlContrasena}
            nombre="Contraseña"
          />
          <Textfield label="Nombre"></Textfield>
          <Textfield label="Apellido"></Textfield>
          <Textfield label="Email"></Textfield>
          <Textfield label="Teléfono"></Textfield>
          <Textfield label="Fecha de Nacimiento"></Textfield>
          <Textfield label="Avatar"></Textfield>
          <Button size="ultrasmall">Crear Admin</Button>
        </InputsContainer>
      </Form>
    </>
  );
}
