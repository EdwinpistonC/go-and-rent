import { Grid } from "@mui/material";
import Alojamiento from "components/molecule/Alojamiento";
import React from "react";

export default function ListaAlojamientos({ alojamientos }) {
  console.log(alojamientos);
  return (
    <Grid container spacing={2} columns={20} width={"100%"}>
      {alojamientos.map((alojamiento, i) => {
        return (
          <Grid item xs={10}>
            <Alojamiento data={alojamiento}></Alojamiento>
          </Grid>
        );
      })}
    </Grid>
  );
}
