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
import { Box, height } from "@mui/system";

export default function Alojamiento({ data }) {
  const navegar = useNavigate();

  return (
    <Card>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        onClick={() => navegar("/detalles/" + data.id)}
      >
        <Grid item xs sx={{ width: 300, margin: "auto" }}>
          <Box
            sx={{ height: 200, width: "100%", objectFit: "cover" }}
            component="img"
            src={"https://prueba-roles.s3.amazonaws.com/" + data.photo}
            alt={"Alojamiento " + data.name}
          />
        </Grid>
        <Grid
          item
          container
          xs
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <CardContent>
            <Grid item xl>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ wordWrap: "normal" }}
              >
                {data.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="text.secondary">
                {data.description}
              </Typography>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}
export function AlojamientoAnfitrion({ data, onClick }) {
  const navegar = useNavigate();
  return (
    <Card sx={{ height: "auto" }} onClick={onClick}>
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
