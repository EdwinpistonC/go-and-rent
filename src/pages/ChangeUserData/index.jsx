import React from "react";

import { Box, Grid } from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import Avatar from "@mui/material/Avatar";
import { green, pink, red } from "@mui/material/colors";
import Api from "server/Api";
import { useInputFormHook } from "Hooks/Inputhooks";
import { useInputsForm } from "Hooks/Inputhooks";
import { Button } from "components/atom/Button";

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

  if (!fields.carga) {
    const api = new Api();
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
      changeField("carga", true);
    });
  }

  return (
    <Grid
      content
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Grid
        content
        sx={{
          display: "flex",
          width: "40%",
          height: "400px",
          backgroundColor: "#FFFFFF",
        }}
        direction="column"
        alignItems="center"
        justifyContent="space-evenly"
        spacing={10}
      >
        <Grid
          item
          sx
          justifyContent="space-evenly"
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
          spacing={30}
          content
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
          spacing={30}
          content
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
          spacing={30}
          content
          justifyContent="space-evenly"
          direction="row"
        >
          <Grid item sx>
            <Button>Editar Datos</Button>
          </Grid>
          <Grid item sx>
            <Button>Cambiar Contraseña</Button>
          </Grid>
          <Grid item sx>
            <Button
              style={{
                backgroundColor: "#d04949",
              }}
            >
              Eliminar Cuenta
            </Button>
          </Grid>
        </Grid>
        <Grid item> </Grid>
      </Grid>
    </Grid>
  );
}
