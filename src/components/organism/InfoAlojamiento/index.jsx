import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { Button } from "components/atom/Button";
import { useNavigate } from "react-router-dom";
import { ListaAlojamientosAnfitrion } from "components/organism/ListaAlojamientos";
import Api from "server/Api";
import { useLocalStorage } from "Hooks/LocalStoreHook";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Rating from "@mui/material/Rating";
import FiltroReservas from "../FiltroReservas";
export default function InfoAlojamiento({
  alojamientoId,
  alojamiento,
  reservas,
}) {
  const navegar = useNavigate();

  return (
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
              <Typography
                variant="h4"
                gutterBottom
                component="div"
                sx={{ textAlign: "center" }}
              >
                {alojamiento.accommodation.name}{" "}
                <Rating
                  name="read-only"
                  value={alojamiento.accommodation.qualification}
                  readOnly
                />
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Typography sx={{ fontWeight: 600, textAlign: "center" }}>
              Descripcion
            </Typography>
            <Typography paragraph sx={{ textAlign: "start", width: "100%" }}>
              {alojamiento.accommodation.description}
            </Typography>
          </Grid>
          <Grid item xs>
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="flex-start"
            >
              <Grid item xs>
                <Typography sx={{ fontWeight: 600, textAlign: "center" }}>
                  Precio por noche
                </Typography>
                <Typography sx={{ textAlign: "center" }}>
                  {alojamiento.accommodation.price} $UY
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            columns={2}
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
          >
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs>
                  <Typography sx={{ fontWeight: 600, textAlign: "center" }}>
                    Caracteristicas
                  </Typography>
                </Grid>
              </Grid>

              {alojamiento.features.map(function (feature, i) {
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
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{ marginX: "0px", marginY: "0px" }}
              >
                <Grid item xs>
                  <Typography sx={{ fontWeight: 600, textAlign: "center" }}>
                    Servicios
                  </Typography>
                </Grid>
              </Grid>
              {alojamiento.services.map(function (service, i) {
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
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="flex-start"
        >
          <Grid item xs>
            <Button
              onClick={() =>
                navegar("/reservas/editar/" + alojamiento.accommodation.id)
              }
            >
              Editar
            </Button>
          </Grid>
          <Grid item xs>
            <Button
              onClick={() =>
                navegar("/reservas/reviews/" + alojamiento.accommodation.id)
              }
            >
              Reviews
            </Button>
          </Grid>
        </Grid>
        <FiltroReservas
          reservas={reservas.bookings}
          idAlojamiento={alojamientoId}
        />
      </Paper>
    </Grid>
  );
}
