import { Grid, Typography, Paper } from "@mui/material";
import { Button } from "components/atom/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ListaAlojamientosAnfitrion } from "components/organism/ListaAlojamientos";
import Api from "server/Api";
import { useLocalStorage } from "Hooks/LocalStoreHook";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export function ListaReservasAnfitrion() {
  const api = new Api();
  const [alojamientos, setAtlojamientos] = React.useState([]);
  const [alojamientoSeleccionado, setAlojamientoSeleccionado] =
    React.useState(0);
  const navegar = useNavigate();
  const [alojamientoActual, setAlojamientoActual] = React.useState(null);
  const [reservasActual, setReservasActual] = React.useState(null);

  const CargarAlojamientos = async () => {
    const resultado = await api.alojamientosAnfitrion();
    setAlojamientoSeleccionado(resultado[0].accommodationId);
    setAtlojamientos(resultado);
  };
  React.useEffect(async () => {
    CargarAlojamientos();
  }, []);
  React.useEffect(async () => {
    if (alojamientoSeleccionado !== 0) {
      const resultado = await api.details(alojamientoSeleccionado);
      setAlojamientoActual(resultado);
      const resultadoReservas = await api.listadoReservas();
      console.log(resultadoReservas);

      if (resultadoReservas.bookings.length > 0) {
        setReservasActual(resultadoReservas);
      }
    }
  }, [alojamientoSeleccionado]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{
        marginX: "0px",
        marginY: "0px",
        overflowY: "auto",
        height: "1200px",
      }}
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
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    backgroundColor: "#b8c5d0",
                  }}
                >
                  <Typography>Reservas Pendientes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {reservasActual != null ? (
                    <Grid item xs container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Typography style={{ wordWrap: "break-word" }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Suspendisse malesuada lacus ex, sit amet blandit
                          leo lobortis eget.
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button>Aceptar</Button>
                      </Grid>
                      <Grid item>
                        <Button>Cancelar</Button>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid item xs container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Typography style={{ wordWrap: "break-word" }}>
                          Sin Reservas Pendientes
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    backgroundColor: "#b8c5d0",
                  }}
                >
                  <Typography>Reservas Actuales</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {reservasActual != null ? (
                    <Grid item xs container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Typography style={{ wordWrap: "break-word" }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Suspendisse malesuada lacus ex, sit amet blandit
                          leo lobortis eget.
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button>Aceptar</Button>
                      </Grid>
                      <Grid item>
                        <Button>Cancelar</Button>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid item xs container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Typography style={{ wordWrap: "break-word" }}>
                          Sin Reservas Actuales
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    backgroundColor: "#b8c5d0",
                  }}
                >
                  <Typography>Reservas Aceptadas</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {reservasActual != null ? (
                    <Grid item xs container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Typography style={{ wordWrap: "break-word" }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Suspendisse malesuada lacus ex, sit amet blandit
                          leo lobortis eget.
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button>Aceptar</Button>
                      </Grid>
                      <Grid item>
                        <Button>Cancelar</Button>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid item xs container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Typography style={{ wordWrap: "break-word" }}>
                          Sin Reservas Aceptadas
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                </AccordionDetails>
              </Accordion>

              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="flex-start"
                sx={{ background: "#7bde90" }}
              >
                <Grid item xs>
                  <Button
                    onClick={() =>
                      navegar("/reservas/editar/" + alojamientoSeleccionado)
                    }
                  >
                    Editar
                  </Button>
                </Grid>
                <Grid item xs>
                  <Button
                    onClick={() =>
                      navegar(
                        "/reservas/reviews/" +
                          alojamientoActual.accommodation.id
                      )
                    }
                  >
                    Reviews
                  </Button>
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
  return <div>hola</div>;
}

export function ListaReservas() {
  const [usuario] = useLocalStorage("usuario", "");
  alert(usuario.rol);
  if (usuario.rol === "ROLE_GUEST") {
    return <ListaReservasHuesped />;
  }
  return <ListaReservasAnfitrion />;
}
