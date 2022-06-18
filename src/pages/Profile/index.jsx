import React from "react";

import { Grid, Rating } from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors";
import Api from "server/Api";
import { useInputsForm } from "Hooks/Inputhooks";
import { Button } from "components/atom/Button";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "Hooks/LocalStoreHook";

export default function Profile() {
  const [fields, handleFieldChange, changeField] = useInputsForm({
    account: null,
    alias: "",
    bank: null,
    birthday: "",
    email: "",
    lastName: "",
    name: "",
    phone: "",
    picture: "",
    qualification: 0,
    carga: false,
  });

  const api = new Api();

  const [usuario, setUsuario] = useLocalStorage("usuario", "");

  const borrarUsuario = async () => {
    //const resultado = await api.borrarUsuario();
    //if (resultado.status === 200) {
    localStorage.removeItem("usuario");

    navegar("/");
    window.location.reload();
    // }
  };

  const navegar = useNavigate();

  if (!fields.carga) {
    const api = new Api();
    changeField("carga", true);

    api.profile().then((response) => {
      const data = response.data;
      console.log(data);
      changeField("account", data.account);
      changeField("alias", data.alias);
      changeField("bank", data.bank);
      changeField("birthday", data.birthday);
      changeField("name", data.name);
      changeField("email", data.email);
      changeField("lastName", data.lastName);

      changeField("phone", data.phone);
      changeField("picture", data.picture);
      changeField("qualification", data.qualification);
    });
  }

  return (
    <Grid
      container
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Grid
        container
        sx={{
          display: "flex",
          minWidth: "40%",
          maxWidth: "fit-content",
          height: "400px",
          backgroundColor: "#FFFFFF",
        }}
        direction="column"
        alignItems="center"
        justifyContent="space-around"
      >
        <Grid
          item
          xs
          container
          justifyContent="space-around"
          alignItems="center"
          direction="column"
        >
          <Grid item xs>
            <Avatar sx={{ bgcolor: green[500] }}>
              <AssignmentIcon />
            </Avatar>
          </Grid>
          <Grid item xs>
            {fields.alias}
          </Grid>
          <Grid item xs>
            <Rating value={fields.qualification} readOnly precision={0.1} />
          </Grid>

          <Grid item xs>
            {fields.email}
          </Grid>
        </Grid>
        <Grid
          item
          xs
          sx={{ width: "80%" }}
          display="flex"
          justifyContent="space-evenly"
        >
          <Grid item xs>
            {fields.name} {fields.lastName}
          </Grid>
          <Grid item xs>
            {fields.birthday}
          </Grid>
        </Grid>
        <Grid
          item
          xs
          sx={{ width: "80%" }}
          display="flex"
          justifyContent="space-evenly"
        >
          <Grid item sx>
            {fields.phone}
          </Grid>
          <Grid item sx>
            {fields.email}
          </Grid>
        </Grid>
        <Grid item xs justifyContent="space-evenly" spacing={"2px"}>
          <Grid item sx>
            <Button onClick={() => navegar("editar")}>Editar Datos</Button>
          </Grid>
          <Grid item xs>
            <Button onClick={() => navegar("cambiar-contrasena")}>
              Cambiar Contraseña
            </Button>
          </Grid>
          {usuario.rol === "ROLE_GUEST" && (
            <Grid item sx>
              <Button onClick={() => borrarUsuario()} color="error">
                Borrar Usuario
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
