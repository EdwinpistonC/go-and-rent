import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Caracteristicas,
  Servicios,
} from "components/molecule/Caracteristicas";
import Api from "server/Api";
import ImageEditor from "components/molecule/ImageEditor";

function GetCaracteristicas() {
  const backend = new Api();
  return backend.features();
}

export default function NewReserve({ submit }) {
  const [caracteristicas, setCaracteristicas] = React.useState([]);
  const [servicios, setServicios] = React.useState([]);

  if (caracteristicas.length == 0 || servicios.length == 0) {
    GetCaracteristicas().then((resultado) => {
      setCaracteristicas(resultado.data.caracteristicas);
      setServicios(resultado.data.servicios);
    });
  }
  return (
    <Box
      sx={{
        width: "70%",
        height: "100%",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#ffffff",

        padding: "4%",
        paddingTop: "0",
        margin: "auto",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "3px",
      }}
    >
      <form>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
        <TextField
          fullWidth
          id="standard-textarea"
          label="Descripcion"
          placeholder="Placeholder"
          multiline
          variant="filled"
          rows={4}
        />
        <Servicios lista={servicios} />
        <Caracteristicas lista={caracteristicas} />
        <ImageEditor></ImageEditor>
      </form>
    </Box>
  );
}
