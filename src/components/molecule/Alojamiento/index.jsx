import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Image from "resources/images/puntadeleste.jpg";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { Button } from "components/atom/Button";

export default function Alojamiento({ data }) {
  const navegar = useNavigate();

  return (
    <Card sx={{ width: "100%", height: "140px" }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        onClick={() => navegar("/detalles/" + data.id)}
      >
        <Grid item xs={4}>
          <img
            height="140"
            src={"https://prueba-roles.s3.amazonaws.com/" + data.photo}
            alt={"Alojamiento " + data.name}
          />
        </Grid>
        <Grid item xs>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.description}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}
export function AlojamientoAnfitrion({ data }) {
  const navegar = useNavigate();
  return (
    <Card sx={{ height: "auto" }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={4}>
          <img
            height="140"
            src={"https://prueba-roles.s3.amazonaws.com/" + data.photo}
            alt={"Alojamiento " + data.name}
          />
        </Grid>
        <Grid item xs>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.description}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}
