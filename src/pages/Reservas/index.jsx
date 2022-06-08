import { Grid, Typography, Paper } from "@mui/material";
import { Button } from "components/atom/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ListaAlojamientosAnfitrion } from "components/organism/ListaAlojamientos";
import Api from "server/Api";

export function ListaReservasAnfitrion() {
  const api = new Api();
  const [alojamientos, setAtlojamientos] = React.useState([]);
  const [alojamientoSeleccionado, setAlojamientoSeleccionado] =
    React.useState(0);
  const navegar = useNavigate();
  const [alojamientoActual, setAlojamientoActual] = React.useState(null);

  const CargarAlojamientos = async () => {
    const resultado = await api.alojamientosAnfitrion();
    console.log(resultado);
    console.log(resultado[0].accommodationId);

    setAlojamientoSeleccionado(resultado[0].accommodationId);
    setAtlojamientos(resultado);
    console.log(alojamientoSeleccionado);
  };
  React.useEffect(async () => {
    CargarAlojamientos();
  }, []);
  React.useEffect(async () => {
    if (alojamientoSeleccionado !== 0) {
      console.log(alojamientoSeleccionado);
      const resultado = await api.details(alojamientoSeleccionado);
      console.log("alojamientoSeleccionado");

      console.log(resultado);
      setAlojamientoActual(resultado);
    }
  }, [alojamientoSeleccionado]);

  console.log(alojamientoActual);
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{ marginX: "0px", marginY: "0px" }}
    >
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        item
        rowSpacing={2}
        xs
        sx={{
          marginX: "12px",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignContent: "stretch",
          justifyContent: "center",
          alignItems: "stretch",
        }}
        display="flex"
      >
        <Grid item xs>
          <Button
            onClick={() => {
              navegar("/anfitrion/nuevo-alojamiento");
            }}
          >
            {" "}
            Crear Alojamiento
          </Button>
        </Grid>
        {alojamientoActual !== null && (
          <Grid item xs sx={{ textAlign: "center", minHeight: "500px" }}>
            <Paper variant="o" elevation={0}>
              <Grid
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  flexFlow: "column nowrap",
                  alignContent: "stretch",
                  justifyContent: "center",
                  alignItems: "stretch",
                }}
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs>
                  <Paper elevation={2}>
                    <Typography variant="h4" gutterBottom component="div">
                      {alojamientoActual.accommodation.name}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs>
                  <Paper elevation={2}>
                    <Typography
                      paragraph
                      sx={{ textAlign: "start", width: "100%" }}
                    >
                      {alojamientoActual.accommodation.description}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="flex-start"
                  >
                    <Grid item xs>
                      <Paper elevation={2}>
                        <Typography>
                          Precio: {alojamientoActual.accommodation.price}
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs>
                      <Paper elevation={2}>
                        <Typography>
                          Calificacion:
                          {alojamientoActual.accommodation.qualification}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs>
                  {alojamientoActual.features.map(function (feature, i) {
                    return (
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        sx={{ marginX: "0px", marginY: "0px" }}
                      >
                        <Grid item xs>
                          <Typography>{feature.name}</Typography>
                        </Grid>
                        <Grid item xs>
                          <Typography>{feature.value}</Typography>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
                <Grid item xs>
                  {alojamientoActual.services.map(function (service, i) {
                    return (
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        sx={{ marginX: "0px", marginY: "0px" }}
                      >
                        <Grid item xs>
                          <Typography>{service.name}</Typography>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid item xs>
                  <Button>Editar</Button>
                </Grid>
                <Grid item xs>
                  <Button>Administrar Reservas</Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}
      </Grid>

      <Grid item xs>
        <ListaAlojamientosAnfitrion
          seleccionar={setAlojamientoSeleccionado}
          alojamientos={alojamientos}
        ></ListaAlojamientosAnfitrion>
      </Grid>
    </Grid>
  );
}
export function ListaReservasHuesped() {
  return <div>index</div>;
}
