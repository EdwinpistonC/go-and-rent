import { Grid, Typography, Paper, Card } from "@mui/material";
import { Button } from "components/atom/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ListaAlojamientosAnfitrion,
  ListaReservaAlojamientoHuesped,
} from "components/organism/ListaAlojamientos";
import Api from "server/Api";
import { useLocalStorage } from "Hooks/LocalStoreHook";

import InfoAlojamiento, {
  InfoReserva,
} from "components/organism/InfoAlojamiento";
import { useModalHook } from "Hooks/ModalHooks";

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
  const [resenas, abrirResenas, cerrarResenas, despuesResenas] = useModalHook();

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
  const [reservasActual, setReservasActual] = React.useState(null);

  const CargarReservas = async () => {
    const resultado = await api.reservasHuesped();
    if (resultado.length === 0) {
      return;
    }
    console.log(resultado);
    setReservaSeleccionado(resultado[0].accommodationId);
    console.log(resultado);
    setReservas(resultado);
  };
  React.useEffect(async () => {
    CargarReservas();
  }, []);
  React.useEffect(async () => {
    if (reservaSeleccionado !== 0) {
      const resultado = await api.detalleReserva(reservaSeleccionado);
      console.log(resultado);

      setReservasActual(resultado);
    }
  }, [reservaSeleccionado]);
  if (reservasActual !== null) {
    return (
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
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
            <InfoReserva
              reserva={reservasActual}
              reservaId={reservaSeleccionado}
            />
          )}
        </Grid>

        <Grid item xs>
          <ListaReservaAlojamientoHuesped
            seleccionar={setReservaSeleccionado}
            reservas={reservas}
          ></ListaReservaAlojamientoHuesped>
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      sx={{
        height: "1200px",
      }}
    >
      <Card
        sx={{
          width: "30%",
          height: "30%",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Typography> Sin reservas realizadas</Typography>
      </Card>
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
