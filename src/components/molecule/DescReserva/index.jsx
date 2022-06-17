import { Typography, Grid, Card } from "@mui/material";
import React from "react";

export default function DescReserva({ reserva, onClick }) {
  /*
  accommodationId: 30
accommodationName: "Casa Mansa"
accommodationPhoto: "alojamiento-30/casa-a1.jpg"
bookingId: 18
bookingStatus: "PENDIENTE"
endDate: "26/06/2022"
hostEmail: "tatiiirivasrivas@gmail.com"
hostName: "Tatiana"
paymentStatus: "PENDIENTE"
startDate: "25/06/2022"
  
  */
  const [estado, setEstado] = React.useState(reserva.bookingStatus);

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
    <Card
      sx={{
        height: "auto",
        "&:hover": {
          background: "#ffffff",
        },
        width: "100%",
      }}
      onClick={onClick}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        sx={{
          width: "100%",
        }}
      >
        <Grid item xs width={"100%"}>
          <Typography>Reserva en {reserva.accommodationName}</Typography>
          <Typography>
            De {reserva.startDate} a {reserva.endDate}
          </Typography>
          <Typography>Consultar Alojamiento</Typography>
          <Typography>Precio</Typography>
        </Grid>
        <Grid item xs width={"100%"}>
          <Typography textAlign={"right"}>{estado}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
