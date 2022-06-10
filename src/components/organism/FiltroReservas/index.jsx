import {
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  NativeSelect,
  Box,
  Rating,
  Container,
  Divider,
} from "@mui/material";
import TextField from "components/atom/Textfield";
import React from "react";
import { DateRange } from "react-date-range";
import * as locales from "react-date-range/dist/locale";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "components/atom/Button";
import Api from "server/Api";

const Reserva = ({ reserva }) => {
  const api = new Api();

  const [rating, setRating] = React.useState(reserva.guestQualification);
  const [estado, setEstado] = React.useState(reserva.bookingStatus);

  const aceptarReserva = () => {
    api.confirmarReserva({ booking_id: reserva.bookingId });
    setEstado("ACEPTADA");
  };
  const rechazarReserva = () => {
    api.rechazarReserva({ booking_id: reserva.bookingId });
    setEstado("CANCELADA");
  };
  const rembolsarReserva = () => {
    api.rembolsarReserva({
      booking_id: reserva.bookingId,
      reimbursedBy: "HOST",
    });
    setEstado("CANCELADA");
  };

  console.log(reserva);
  /*
  accommodationId: 18;
  accommodationName: "Alojamiento 15 Anfitrion 1";
  bookingId: 29;
  bookingStatus: "PENDIENTE";
  endDate: "17/08/2022";
  guestAlias: "edwin";
  guestEmail: "edwin@test.com";
  guestName: "Edwin";
  guestPhone: "099999999";
  guestQualification: 0;
  paymentStatus: "PENDIENTE";
  startDate: "16/08/2022";
  */
  let estadoActual = estado;

  var datePartsEnd = reserva.endDate.split("/");
  var datePartsStart = reserva.startDate.split("/");

  // month is 0-based, that's why we need dataParts[1] - 1
  var lastDate = new Date(
    +datePartsEnd[2],
    datePartsEnd[1] - 1,
    +datePartsEnd[0]
  );

  var startDate = new Date(
    +datePartsStart[2],
    datePartsStart[1] - 1,
    +datePartsStart[0]
  );

  console.log(lastDate);
  console.log(new Date());
  if (lastDate < new Date() && estadoActual === "ACEPTADA") {
    estadoActual = "COMPLETADA";
    setEstado("COMPLETADA");
  } else if (lastDate < new Date() && estadoActual === "PENDIENTE") {
    estadoActual = "CANCELADA";
    setEstado("CANCELADA");
  } else if (
    startDate < new Date() &&
    lastDate > new Date() &&
    estadoActual === "PENDIENTE"
  ) {
    setEstado("EN CURSO");

    estadoActual = "EN CURSO";
  }
  return (
    <Paper elevation={6} sx={{ marginBottom: "5px", marginTop: "5px" }}>
      <Box p={1} flexDirection={"row"}>
        <Typography sx={{ textAlign: "end" }}>
          Estado: {estadoActual}
        </Typography>{" "}
        <Divider />
        <Grid container direction="row" spacing={2}>
          <Grid item xs>
            <Typography>Fechas</Typography>
            <Typography>
              {reserva.startDate} hasta {reserva.endDate}
            </Typography>
          </Grid>
          <Grid item xs>
            <Box>
              <Grid container direction="row" spacing={2} wrap={"nowrap"}>
                <Grid item xs>
                  <Typography>{reserva.guestAlias}</Typography>
                </Grid>
                <Grid item xs>
                  <Typography>{reserva.guestName}</Typography>
                </Grid>
              </Grid>
              <Grid item xs>
                <Typography>{reserva.guestPhone}</Typography>
              </Grid>
              <Grid item xs>
                <Typography>{reserva.guestEmail}</Typography>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ marginBlock: "10px" }} />
        {estadoActual === "PENDIENTE" && (
          <Grid
            container
            direction="row"
            spacing={2}
            justifyContent={"space-evenly"}
          >
            <Grid item xs>
              <Button onClick={aceptarReserva}>Aceptar</Button>
            </Grid>
            <Grid item xs>
              <Button onClick={rechazarReserva}>Rechazar</Button>
            </Grid>
          </Grid>
        )}
        {estadoActual === "COMPLETADA" && (
          <Container fixed>
            <Grid
              container
              direction="row"
              spacing={2}
              justifyContent={"space-evenly"}
            >
              <Grid item xs>
                <Typography>Calificar Huesped</Typography>
              </Grid>
              <Grid item xs>
                <Rating
                  value={rating}
                  onChange={(e) => {
                    let val = e.target.value;

                    if (Number(val) === rating) {
                      val = 0;
                      api.eliminarCalificacionHuesped(reserva.guestAlias);
                    } else {
                      api.calificarHuesped({
                        qualifiedUser: reserva.guestAlias,
                        qualification: val,
                      });
                    }
                    console.log(val);
                    console.log(rating);

                    setRating(Number(val));
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        )}
        {estadoActual === "ACEPTADA" && (
          <Container fixed>
            <Grid
              container
              direction="row"
              spacing={2}
              justifyContent={"space-evenly"}
            >
              <Grid item xs>
                <Button onClick={rembolsarReserva}>Rembolsar</Button>
              </Grid>
            </Grid>
          </Container>
        )}
      </Box>
    </Paper>
  );
};

export default function FiltroReservas({ idAlojamiento, reservas }) {
  console.log(reservas);
  console.log(idAlojamiento);

  const [filtro, setFiltro] = React.useState({
    estado: "",
    fechas: [
      {
        startDate: new Date(),
        endDate: null,
        key: "selection",
      },
    ],
  });
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Filtrar</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            sx={{ marginTop: "10px" }}
          >
            <Grid item>
              <TextField type="text" placeholder="Buscar" label="Buscar" />
            </Grid>
            <Grid item>
              <NativeSelect
                defaultValue={"PENDIENTE"}
                inputProps={{
                  name: "age",
                  id: "uncontrolled-native",
                }}
                sx={{ height: "100%" }}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              >
                <option value={"PENDIENTE"}>Pendientes</option>
                <option value={"ACEPTADA"}>Aceptadas</option>
                <option value={"CANCELADA"}>Canceladas</option>
                <option value={"FINALIZADA"}>Finalizadas</option>
              </NativeSelect>
            </Grid>
            <Grid item>
              <DateRange
                style={{ paddingLeft: "0 !important" }}
                editableDateInputs={true}
                locale={locales["es"]}
                key="datefilter"
                onChange={(ranges) => {
                  const { selection } = ranges;
                  console.log(selection);
                  setFiltro({ ...filtro, fechas: [selection] });
                }}
                ranges={filtro.fechas}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {reservas.map(function (reserva, index) {
        if (reserva.accommodationId === idAlojamiento) {
          return <Reserva key={index} reserva={reserva} />;
        }
      })}
    </>
  );
}
