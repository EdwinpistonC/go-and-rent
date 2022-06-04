import React from "react";

import { Grid } from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors";
import Api from "server/Api";
import { useInputsForm } from "Hooks/Inputhooks";
import { Button } from "components/atom/Button";
import { useNavigate } from "react-router-dom";

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

  const navegar = useNavigate();

  const [alertaCerrarSesion, setAlerta] = React.useState(false);
  const handleOpen = () => setAlerta(true);
  const handleClose = () => setAlerta(false);

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
          width: "40%",
          height: "400px",
          backgroundColor: "#FFFFFF",
        }}
        direction="column"
        alignItems="center"
        justifyContent="space-around"
      >
        <Grid
          item
          sx
          container
          justifyContent="space-around"
          alignItems="center"
          direction="column"
          display="flex"
        >
          <Grid item>
            <Avatar sx={{ bgcolor: green[500] }}>
              <AssignmentIcon />
            </Avatar>
          </Grid>
          <Grid item>{fields.alias}</Grid>
          <Grid item> {fields.email}</Grid>
        </Grid>
        <Grid
          item
          sx={{ width: "80%" }}
          display="flex"
          justifyContent="space-evenly"
          direction="row"
        >
          <Grid item sx>
            {fields.name} {fields.lastName}
          </Grid>
          <Grid item sx>
            {fields.birthday}
          </Grid>
        </Grid>
        <Grid
          item
          sx={{ width: "80%" }}
          display="flex"
          justifyContent="space-evenly"
          direction="row"
        >
          <Grid item sx>
            {fields.phone}
          </Grid>
          <Grid item sx>
            {fields.email}
          </Grid>
        </Grid>
        <Grid
          item
          sx={{ width: "100%" }}
          display="flex"
          justifyContent="space-evenly"
          direction="row"
        >
          <Grid item sx>
            <Button onClick={() => navegar("editar")}>Editar Datos</Button>
          </Grid>
          <Grid item sx>
            <Button onClick={() => navegar("cambiar-contrasena")}>
              Cambiar Contraseña
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}