import React from "react";
import Container from "@mui/material/Container";

import { SideBarFilter } from "components/organism/SideBarMenu";
import ListaAlojamientos from "components/organism/ListaAlojamientos";
import { useSearchParams } from "react-router-dom";

import { Alert, Grid, Snackbar } from "@mui/material";
import Api from "server/Api";
import { useGlobalState } from "Hooks/GlobalHook";

export default function Busqueda() {
  //"Uruguay", "Canelones", "Solymar"
  const api = new Api();
  const [alojamientos, setAlojamientos] = React.useState([]);
  const [searchParams] = useSearchParams();
  const [newPlace, setNewPlace] = React.useState([]);

  const [, dispatch] = useGlobalState();

  React.useEffect(() => {
    if (searchParams.has("piriapolis") && newPlace.value == null) {
      newPlace.value = {
        terms: [
          {
            offset: 0,
            value: "Piriápolis",
          },
          {
            offset: 11,
            value: "Departamento de Maldonado",
          },
          {
            offset: 38,
            value: "Uruguay",
          },
        ],
      };
      dispatch({ busqueda: newPlace });
    } else if (searchParams.has("montevideo") && newPlace.value == null) {
      newPlace.value = {
        terms: [
          {
            offset: 0,
            value: "Montevideo",
          },
          {
            offset: 11,
            value: "Departamento de Montevideo",
          },
          {
            offset: 39,
            value: "Uruguay",
          },
        ],
      };
      dispatch({ busqueda: newPlace });
    } else if (searchParams.has("puntadeldiablo") && newPlace.value == null) {
      newPlace.value = {
        terms: [
          {
            offset: 0,
            value: "Punta del Diablo",
          },
          {
            offset: 17,
            value: "Departamento de Rocha",
          },
          {
            offset: 40,
            value: "Uruguay",
          },
        ],
      };
      console.log("entra");
      console.log(newPlace);
      dispatch({ busqueda: newPlace });
    } else if (searchParams.has("puntadeleste") && newPlace.value == null) {
      console.log("entra");

      newPlace.value = {
        terms: [
          {
            offset: 0,
            value: "Punta del Este",
          },
          {
            offset: 15,
            value: "Departamento de Maldonado",
          },
          {
            offset: 42,
            value: "Uruguay",
          },
        ],
      };
      dispatch({ busqueda: newPlace });
    }

    return () => {};
  }, []);

  const [state, setState] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = async () => {
    return setState({ ...state, open: true });
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const [fechas, setFechas] = React.useState(["", ""]);

  const ordenar = (alojamientos, sentidoAsc) => {
    let resultado = [];
    console.log(alojamientos);
    if (sentidoAsc) {
      resultado = alojamientos.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else {
      resultado = alojamientos.sort((a, b) => (a.name < b.name ? 1 : -1));
    }
    console.log(resultado);
    console.log(sentidoAsc);
    return resultado;
  };

  const filtrar = async (
    place,
    startDate = "",
    endDate = "",
    servicios,
    caracteristicas,
    _ordenar = true
  ) => {
    setFechas([startDate, endDate]);
    if (typeof place.value === "undefined" && newPlace.value != null) {
      await handleClick();
      return;
    }
    let country = place.value.terms[0].value;
    let province = place.value.terms[0].value;
    let city = place.value.terms[0].value;

    if (place.value.terms.length === 3) {
      country = place.value.terms[2].value;
      province = place.value.terms[1].value;
    } else if (place.value.terms.length === 2) {
      country = place.value.terms[1].value;
      province = place.value.terms[0].value;
    }
    let serviciosApi = [];
    servicios.map(function (servicio) {
      if (servicio.valor) {
        serviciosApi.push(servicio.id);
      }
      return servicio;
    });
    let caracteristicaApi = [];
    caracteristicas.map(function (caracteristica) {
      if (caracteristica.cantidad > 0) {
        caracteristicaApi.push(
          caracteristica.id + "-" + caracteristica.cantidad
        );
      }
      return caracteristica;
    });

    if (startDate === endDate) {
      const resultado = await api.filter({
        city: city,
        country: country,
        province: province,
        priceFrom: 0,
        priceTo: 10000000,
        features: caracteristicaApi,
        services: serviciosApi,
      });

      setAlojamientos(ordenar(resultado, _ordenar));
    } else {
      const resultado = await api.filter({
        city: city,
        country: country,
        province: province,
        priceFrom: 0,
        priceTo: 10000000,
        dateFrom: startDate,
        dateTo: endDate,
        features: caracteristicaApi,
        services: serviciosApi,
      });
      console.log("filtrar");
      setAlojamientos(ordenar(resultado, _ordenar));
    }
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
      <Snackbar
        severity="error"
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        onClose={handleClose}
        message="I love snacks"
        key={"alerta"}
      >
        <Alert severity="error">
          Debe buscarse una localización para obtener un resultado
        </Alert>
      </Snackbar>
      <Grid item>
        <Container
          maxWidth="xs"
          disableGutters
          sx={{
            marginLeft: 0,
            marginTop: "-10px",
            marginBottom: "-10px",
          }}
          xs
        >
          <SideBarFilter filtrar={filtrar} newPlace={newPlace} />
        </Container>
      </Grid>
      <Grid item xs>
        <ListaAlojamientos
          alojamientos={alojamientos}
          startDate={fechas[0]}
          endDate={fechas[1]}
        />
      </Grid>
    </Grid>
  );
}
