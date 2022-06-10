import { Card, Chip, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import Api from "server/Api";
import Galeria from "components/molecule/Galeria";
import Loading from "components/atom/Loading";
import { GoogleMapLocation } from "components/atom/Googlemap";
import { Button } from "components/atom/Button";
import { DateRange } from "react-date-range";
import * as locales from "react-date-range/dist/locale";
import { ReservarAlojamiento } from "components/organism/FormModal";
import moment from "moment";
import { formatDate } from "components/util/functions";
import { useModalHook } from "Hooks/ModalHooks";
export default function DetalleAlojamiento() {
  const { id } = useParams();
  const api = new Api();
  const [galeria, setGaleria] = React.useState([]);
  const [alojamiento, setAlojamiento] = React.useState(null);
  const [urlReserva, setUrlReserva] = React.useState(null);
  const [paypalModal, abrirPaypalModal, cerrarPaypalModal, despuesPaypalModal] =
    useModalHook();
  const [fecha, setFecha] = React.useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const obtenerDatos = async () => {
    const data = await api.details(id);
    console.log(data);

    data.photos.map(function (foto) {
      setGaleria([
        ...galeria,
        {
          original: process.env.REACT_APP_API_IMG + foto,
          thumbnail: process.env.REACT_APP_API_IMG + foto,
        },
      ]);
    });
    setAlojamiento(data);
    console.log(galeria);
  };

  React.useEffect(() => {
    obtenerDatos();

    return;
  }, []);

  if (alojamiento == null) {
    return <Loading />;
  }

  const realizarReserva = async () => {
    let alias = JSON.parse(localStorage.getItem("usuario")).alias;
    let payload = {
      idAccommodation: id,
      aliasGuest: alias,
      start_date: formatDate(new Date(fecha[0].startDate)),
      end_date: formatDate(new Date(fecha[0].endDate)),
    };

    const response = await api.booking(payload);

    console.log(response);
    setUrlReserva(response.replace("redirect:", ""));
    abrirPaypalModal();
    console.log(response.replace("redirect:", ""));
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flexStart",
        width: "80%",
        background: "#ffffff",

        height: "1315px",
        margin: "auto",

        borderRadius: "31px",
      }}
    >
      {urlReserva != null && (
        <ReservarAlojamiento
          url={urlReserva}
          abrirModal={paypalModal}
          cerrarModal={abrirPaypalModal}
          onCloseModal={cerrarPaypalModal}
          onAfterOpen={despuesPaypalModal}
        ></ReservarAlojamiento>
      )}

      <Typography
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px 0px",
          gap: "10px",
          width: "100%",
          height: "84px",
          borderRadius: "36px",
          flex: "none",
          order: 0,
          alignSelf: "stretch",
          flexGrow: 0,
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: 700,
          fontSize: "40px",
          lineHeight: "44px",
          textAlign: "center",
        }}
      >
        {alojamiento.accommodation.name}
      </Typography>

      <Card
        sx={{
          width: "100%",
          height: "inherit",
          background: "#FFFFFF",
          flex: "none",
          margin: "auto",
          borderRadius: "0px",

          order: 1,
          flexGrow: 0,
        }}
      >
        <Container
          sx={{
            width: "100%",
            height: "50%",
            left: "0px",
            top: "0px",
            height: "400px",
          }}
        >
          {/*Galeria de imagenes */}
        </Container>
        <Container
          sx={{
            /* Auto layout */
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            height: "100%",
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
              width: "30%",
              height: "60%",

              /* Inside auto layout */

              flex: "none",
              order: 0,
              alignSelf: "stretch",
              flexGrow: 1,
              padding: 0,
            }}
            style={{
              paddingLeft: "0px !important",
              paddingRight: "0px !important",
            }}
          >
            <Container
              sx={{
                order: 0,
                alignSelf: "stretch",
                flexGrow: 1,
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                height: "110%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Container
                sx={{
                  flex: "none",
                  order: 0,
                  alignSelf: "stretch",
                  flexGrow: 1,
                  paddingLeft: 0,
                }}
                style={{ paddingLeft: "0 !important" }}
              >
                <DateRange
                  style={{ paddingLeft: "0 !important" }}
                  editableDateInputs={true}
                  locale={locales["es"]}
                  key="datefilter"
                  onChange={(ranges) => {
                    const { selection } = ranges;
                    console.log(selection);
                    setFecha([selection]);
                  }}
                  ranges={fecha}
                />
              </Container>

              <Container sx={{ paddingBottom: "10px" }}>
                <Button
                  onClick={() => {
                    realizarReserva();
                  }}
                >
                  Reservar
                </Button>
              </Container>
            </Container>
            <Container
              sx={{
                flex: "none",
                order: 0,
                alignSelf: "stretch",
                flexGrow: 1,
                height: "50%",
                width: "100%",
                padding: "0 !important",
              }}
            >
              <GoogleMapLocation></GoogleMapLocation>
            </Container>
          </Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
              padding: "0px",
              height: "50%",

              width: "40%",

              /* Inside auto layout */

              flex: "none",
              order: 0,
              alignSelf: "stretch",
              flexGrow: 1,
            }}
          >
            <Container
              sx={{
                flex: "none",
                alignItems: "start",
                order: 0,
                alignSelf: "stretch",
                flexGrow: 1,
                gap: "20px",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  width: "100%",
                  textDecorationLine: "underline",
                  marginBottom: "30px",
                }}
              >
                Descripcion del apartamento
              </Typography>
              <Typography
                variant="p"
                sx={{
                  textAlign: "center",
                  width: "100%",
                  marginTop: "10px",
                  height: "50%",
                }}
              >
                {alojamiento.accommodation.description}
              </Typography>
            </Container>
            <Container
              sx={{
                flex: "none",
                order: 0,
                alignSelf: "stretch",
                flexGrow: 1,
                height: "50%",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  width: "100%",
                  textDecorationLine: "underline",
                  marginBottom: "30px",
                }}
              >
                Caracteristicas
              </Typography>
              {alojamiento.features.map(function (feature, index) {
                return (
                  <Chip
                    key={"feature" + index}
                    label={feature.name + " : " + feature.value}
                  />
                );
              })}
              {alojamiento.services.map(function (service, index) {
                if (service.value) {
                  return <Chip key={"service" + index} label={service.name} />;
                }
              })}
            </Container>
          </Container>
        </Container>
      </Card>
    </Card>
  );
}
