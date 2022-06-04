import { Grid } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import Api from "server/Api";
export default function DetalleAlojamiento() {
  const { id } = useParams();
  const api = new Api();

  const obtenerDatos = async () => {
    const data = await api.details(id);
    console.log(data);
  };

  obtenerDatos();

  return <Grid></Grid>;
}
