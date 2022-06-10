import { Grid } from "@mui/material";
import Alojamiento, {
  AlojamientoAnfitrion,
} from "components/molecule/Alojamiento";
import React from "react";

export default function ListaAlojamientos({ alojamientos = [] }) {
  console.log(alojamientos);
  return (
    <Grid container columns={20} width={"100%"}>
      {alojamientos.map((alojamiento, i) => {
        return (
          <Grid item xs={10} key={i}>
            <Alojamiento data={alojamiento}></Alojamiento>
          </Grid>
        );
      })}
    </Grid>
  );
}
export function ListaAlojamientosAnfitrion({
  alojamientos = [],
  seleccionar = () => {},
}) {
  return (
    <Grid
      container
      columns={20}
      sx={{ overflowY: "auto", maxHeight: 700, background: "#d4d4d4" }}
      key={"listaAlojamiento"}
    >
      {alojamientos.map((alojamiento, i) => {
        return (
          <Grid item xs={20} key={i}>
            <AlojamientoAnfitrion
              onClick={() => seleccionar(alojamiento.accommodationId)}
              data={alojamiento}
            ></AlojamientoAnfitrion>
          </Grid>
        );
      })}
    </Grid>
  );
}
