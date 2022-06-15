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
import Rating from "@mui/material/Rating";
import InfoAlojamiento from "components/organism/InfoAlojamiento";
import { Info } from "@mui/icons-material";

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
      } else {
        setReservasActual([]);
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
        {alojamientoActual !== null && reservasActual !== null && (
          <InfoAlojamiento
            alojamiento={alojamientoActual}
            reservas={reservasActual}
            alojamientoId={alojamientoSeleccionado}
          />
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
  const api = new Api();
  const [reservas, setReservas] = React.useState([]);
  const [reservaSeleccionado, setReservaSeleccionado] = React.useState(0);
  const navegar = useNavigate();
  const [reservasActual, setReservasActual] = React.useState(null);

  const CargarReservas = async () => {
    const resultado = await api.reservasHuesped();
    setReservaSeleccionado(resultado[0].accommodationId);
    console.log(resultado);
    setReservas(resultado);
  };
  React.useEffect(async () => {
    CargarReservas();
  }, []);
  // React.useEffect(async () => {
  //   if (reservaSeleccionado !== 0) {
  //     const resultado = await api.details(reservaSeleccionado);
  //     setAlojamientoActual(resultado);
  //     const resultadoReservas = await api.listadoReservas();
  //     console.log(resultadoReservas);

  //     if (resultadoReservas.bookings.length > 0) {
  //       setReservasActual(resultadoReservas);
  //     }
  //   }
  // }, [reservaSeleccionado]);

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
        {reservasActual !== null && (
          <Grid item xs sx={{ textAlign: "left", minHeight: "500px" }}>
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
                      {reservasActual.accommodation.name}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs>
                  <Paper elevation={2}>
                    <Typography
                      paragraph
                      sx={{ textAlign: "start", width: "100%" }}
                    >
                      {reservasActual.accommodation.description}
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
                          Precio: {reservasActual.accommodation.price}
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs>
                      <Paper elevation={2}>
                        <Typography component="legend">Calificacion</Typography>
                        <Rating
                          name="read-only"
                          value={reservasActual.accommodation.qualification}
                          readOnly
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs>
                  {reservasActual.features.map(function (feature, i) {
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
                  {reservasActual.services.map(function (service, i) {
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
                      navegar("/reservas/editar/" + reservaSeleccionado)
                    }
                  >
                    Editar
                  </Button>
                </Grid>
                <Grid item xs>
                  <Button
                    onClick={() =>
                      navegar(
                        "/reservas/reviews/" + reservasActual.accommodation.id
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
          seleccionar={setReservaSeleccionado}
          alojamientos={reservas}
        ></ListaAlojamientosAnfitrion>
      </Grid>
    </Grid>
  );
}

export function ListaReservas() {
  const [usuario] = useLocalStorage("usuario", "");
  console.log(usuario.rol);
  if (usuario.rol === "ROLE_GUEST") {
    return <ListaReservasHuesped />;
  } else if (usuario.rol === "ROLE_HOST") {
    return <ListaReservasAnfitrion />;
  }
}
