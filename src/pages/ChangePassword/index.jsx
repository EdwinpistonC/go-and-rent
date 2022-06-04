import React from "react";

import { Box, Grid } from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import Avatar from "@mui/material/Avatar";
import { green, pink, red } from "@mui/material/colors";
import Api from "server/Api";
import { useInputFormHook } from "Hooks/Inputhooks";
import { useInputsForm } from "Hooks/Inputhooks";
import { Button } from "components/atom/Button";
import { H1 } from "./StyledComponent";
import { FormChangePasswordProfile } from "components/organism/Forms";
import { useNavigate } from "react-router-dom";
export default function ChangePassword() {
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
        height: "100%",
        background: "#ffff",
        marginInline: "30%",
      }}
      alignSelf="center"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <H1>Cambiar Contraseña</H1>
        <FormChangePasswordProfile
          onBack={() => navegar("/perfil")}
        ></FormChangePasswordProfile>
      </Grid>
    </Grid>
  );
}