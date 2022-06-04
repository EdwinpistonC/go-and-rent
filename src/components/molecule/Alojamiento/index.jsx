import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "resources/images/puntadeleste.jpg";
import { useNavigate } from "react-router-dom";

export default function Alojamiento({ data }) {
  const navegar = useNavigate();

  return (
    <Card
      sx={{ maxWidth: "100%" }}
      onClick={() => navegar("/detalles/" + data.id)}
    >
      <CardMedia
        component="img"
        height="140"
        src={"https://prueba-roles.s3.amazonaws.com/" + data.photo}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
