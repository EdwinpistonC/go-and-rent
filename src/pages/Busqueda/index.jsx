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
    if (typeof place.value === "undefined") {
      return;
    }
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

    let serviciosApi = [];
    servicios.map(function (servicio) {
      if (servicio.valor) {
        serviciosApi.append(servicio.id);
      }
    });
    let caracteristicaApi = [];
    caracteristicas.map(function (caracteristica) {
      if (caracteristica.cantidad > 0) {
        caracteristicaApi.append(
          caracteristica.id + "-" + caracteristica.cantidad
        );
      }
    });
    console.log(serviciosApi);

    console.log(caracteristicaApi);

    const resultado = await api.filter({
      city: city,
      country: country,
      province: province,
      priceFrom: 20,
      priceTo: 10000000,
      dateFrom: "01/08/1993",
      dateTo: "01/08/2030",
      features: caracteristicaApi,
      services: serviciosApi,
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
      columns={2}
    >
      <Grid item>
        <Container
          maxWidth="xs"
          disableGutters
          sx={{
            marginLeft: 0,
            marginTop: 0,
            marginTop: "-10px",
            marginBottom: "-10px",
          }}
          xs
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
