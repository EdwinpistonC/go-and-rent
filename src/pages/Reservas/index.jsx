import { Grid, Typography, Card } from "@mui/material";
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

export function ListaReservasAnfitrion() {
  const [alojamientos, setAtlojamientos] = React.useState([]);
  const [alojamientoSeleccionado, setAlojamientoSeleccionado] =
    React.useState(0);
  const navegar = useNavigate();
  const [alojamientoActual, setAlojamientoActual] = React.useState(null);
  const [reservasActual, setReservasActual] = React.useState(null);

  React.useEffect(() => {
    const api = new Api();

    const CargarAlojamientos = async () => {
      const resultado = await api.alojamientosAnfitrion();
      setAlojamientoSeleccionado(resultado[0].accommodationId);
      setAtlojamientos(resultado);
    };
    CargarAlojamientos();
  }, []);

  React.useEffect(() => {
    if (alojamientoSeleccionado !== 0) {
      const api = new Api();

      const fetchData = async () => {
        const resultado = await api.details(alojamientoSeleccionado);
        setAlojamientoActual(resultado);
        const resultadoReservas = await api.listadoReservas();

        if (resultadoReservas.bookings.length > 0) {
          setReservasActual(resultadoReservas);
        } else {
          setReservasActual([]);
        }
      };

      fetchData();
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

      <Grid item xs height={"inherit"}>
        <ListaAlojamientosAnfitrion
          seleccionar={setAlojamientoSeleccionado}
          alojamientos={alojamientos}
        ></ListaAlojamientosAnfitrion>
      </Grid>
    </Grid>
  );
}
export function ListaReservasHuesped() {
  const [reservas, setReservas] = React.useState([]);
  const [reservaSeleccionado, setReservaSeleccionado] = React.useState(0);
  const [reservasActual, setReservasActual] = React.useState({});

  React.useEffect(() => {
    const api = new Api();

    const CargarReservas = async () => {
      const resultado = await api.reservasHuesped();
      if (resultado.length === 0) {
        return;
      }
      setReservaSeleccionado(resultado[0].accommodationId);
      setReservasActual(resultado[0]);
      setReservas(resultado);
    };
    CargarReservas();
  }, []);

  const modificarReservaActual = (id) => {
    const api = new Api();

    api.detalleReserva(id).then((response) => {
      setReservasActual(response);
      setReservaSeleccionado(id);
    });
  };

  if (typeof reservasActual.accommodationId !== "undefined") {
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

        <Grid item xs sx={{ height: "inherit" }}>
          <ListaReservaAlojamientoHuesped
            seleccionar={modificarReservaActual}
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
  if (usuario.rol === "ROLE_GUEST") {
    return <ListaReservasHuesped />;
  } else if (usuario.rol === "ROLE_HOST") {
    return <ListaReservasAnfitrion />;
  }
}
