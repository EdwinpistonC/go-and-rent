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

export default function Alojamiento({ data, startDate = "", endDate = "" }) {
  const navegar = useNavigate();
  return (
    <Card sx={{ marginLeft: "10px", marginBottom: "10px" }}>
      <Grid
        className="cursor-pointer"
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        onClick={() => {
          if (startDate === "") {
            return navegar("/detalles/" + data.id);
          }
          navegar(
            "/detalles/" +
              data.id +
              "/" +
              startDate.replaceAll("/", "-") +
              "/" +
              endDate.replaceAll("/", "-")
          );
        }}
      >
        <Grid item xs sx={{ width: 300 }}>
          <Box
            sx={{
              objectFit: "cover",
              backgroundImage: `url(${
                process.env.REACT_APP_API_IMG + data.photo
              })`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "50% 50%",
              height: "230px",
              width: "100%",
            }}
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
          sx={{ width: 300, height: "230px" }}
        >
          <CardContent>
            <Grid item xl sx={{ wordWrap: "normal" }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {data.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "7",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {data.description.length > 150
                  ? data.description.substring(0, 150) + "..."
                  : data.description}
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
    <Card
      sx={{
        height: "auto",
        "&:hover": {
          background: "#ffffff",
        },
      }}
      onClick={onClick}
    >
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs>
          <Box
            sx={{
              objectFit: "cover",
              backgroundImage: `url(${
                process.env.REACT_APP_API_IMG + data.photo
              })`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "50% 50%",
              height: "230px",
              width: "100%",
            }}
            alt={"Alojamiento " + data.name}
          />
        </Grid>
        <Grid item xs width="200px">
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              width="200px"
              sx={{
                wordWrap: "normal",
              }}
            >
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
