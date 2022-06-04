import React from "react";
import Container from "@mui/material/Container";

import { SideBarFilter } from "components/organism/SideBarMenu";
import ListaAlojamientos from "components/organism/ListaAlojamientos";
import { Grid } from "@mui/material";
import Api from "server/Api";

export default function Busqueda() {
  //"Uruguay", "Canelones", "Solymar"

  const api = new Api();
  const [alojamientos, setAlojamientos] = React.useState([]);

  const filtrar = async (
    place,
    startDate,
    endDate,
    servicios,
    caracteristicas
  ) => {
    console.log(place.value);
    let country = place.value.terms[0];
    let province = place.value.terms[0];
    let city = place.value.terms[0];
    if (place.value.terms.length == 2) {
      province = place.value.terms[1];
      city = place.value.terms[1];
    } else if (place.value.terms.length == 3) {
      province = place.value.terms[1];
      city = place.value.terms[2];
    }
    country = "Uruguay";
    province = "Canelones";

    city = "Solymar";

    const resultado = await api.filter({
      city: city,
      country: country,
      province: province,
      priceFrom: 20,
      priceTo: 10000000,
      dateFrom: "01/08/1993",
      dateTo: "01/08/2030",
      features: ["4-2"],
      services: [1],
    });
    setAlojamientos(resultado);
    console.log(resultado);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
    >
      <Grid item xl={10} lg={4} md={6} xs={12}>
        <Container
          maxWidth="xs"
          disableGutters
          sx={{
            marginLeft: 0,
            marginTop: 0,
            marginTop: "-10px",
            marginBottom: "-10px",
          }}
        >
          <SideBarFilter filtrar={filtrar} />
        </Container>
      </Grid>
      <Grid item xs>
        <ListaAlojamientos alojamientos={alojamientos} />
      </Grid>
    </Grid>
  );
}
