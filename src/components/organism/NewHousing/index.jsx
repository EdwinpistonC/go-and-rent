import React from "react";

import Box from "@mui/material/Box";
import {
  Caracteristicas,
  Servicios,
} from "components/molecule/Caracteristicas";
import Api from "server/Api";
import ImageEditor from "components/molecule/ImageEditor";
import { Button } from "components/atom/Button";
import Grid from "@mui/material/Grid";

import { FormTextfield } from "components/atom/Textfield";
import { useInputsForm } from "Hooks/Inputhooks";
import { Typography } from "@mui/material";

function GetCaracteristicas() {
  const backend = new Api();
  return backend.features();
}

export default function NewHousing({ submit }) {
  const [fields, handleFieldChange, changeField] = useInputsForm({
    serviciosApi: [],
    caracteristicasApi: [],
    locCoordinates: [],
    locCountry: [],
    locRegion: [],
    accPrice: [],
    locStreet: [],
    imagenes: [],
    locDoorNumber: [],
    accName: [],
    accDescription: [],
    apiError: [],
  });

  const [servicios, setServicios] = React.useState([]);
  const [caracteristicas, setCaracteristicas] = React.useState([]);

  if (
    fields.caracteristicasApi.length === 0 ||
    fields.serviciosApi.length === 0
  ) {
    GetCaracteristicas().then((resultado) => {
      resultado.data.servicios.map((item) => (item.valor = false));
      resultado.data.caracteristicas.map((item) => (item.cantidad = 0));
      console.log(resultado);
      changeField("serviciosApi", resultado.data.servicios);
      setServicios(resultado.data.servicios);
      changeField("caracteristicasApi", resultado.data.caracteristicas);
      setCaracteristicas(resultado.data.caracteristicas);
    });
  }

  return (
    <Box
      sx={{
        width: "70%",
        height: "100%",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#ffffff",

        padding: "4%",
        paddingTop: "0",
        margin: "auto",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "3px",
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();

          submit(
            servicios,
            caracteristicas,
            fields.locCoordinates,
            fields.locCountry,
            fields.locRegion,
            fields.locStreet,
            fields.locDoorNumber,
            fields.accPrice,
            fields.accName,
            fields.accDescription,
            fields.imagenes
          )
            .then((response, status) => {
              console.log(response);
            })
            .catch((err) => {
              console.log(err);
              console.log(err.response);

              if (err.response.status === 401) {
                changeField(
                  "apiError",
                  "Tu contraseña es incorrecta o la cuenta ingresada no existe"
                );
              }
            });
          return false;
        }}
      >
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <Typography
              sx={{ textAlign: "center", fontSize: "30px", paddingTop: "20px" }}
            >
              Creacion de Alojamiento
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <FormTextfield
              id="accName"
              onChange={handleFieldChange}
              nombre="Nombre del alojamiento"
            ></FormTextfield>
          </Grid>
          <Grid item xs={12}>
            <FormTextfield
              id="accDescription"
              onChange={handleFieldChange}
              nombre="Descripcion"
              multiline
              rows={4}
            ></FormTextfield>
          </Grid>
          <Grid
            container
            rowSpacing={4}
            item
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <FormTextfield
                id="locCoordinates"
                onChange={handleFieldChange}
                nombre="Coordenadas"
              ></FormTextfield>
            </Grid>
            <Grid item xs={6}>
              <FormTextfield
                id="locCountry"
                onChange={handleFieldChange}
                nombre="Pais"
              ></FormTextfield>
            </Grid>

            <Grid item xs={6}>
              <FormTextfield
                id="locRegion"
                onChange={handleFieldChange}
                nombre="Region"
              ></FormTextfield>
            </Grid>
            <Grid item xs={6}>
              <FormTextfield
                id="accPrice"
                onChange={handleFieldChange}
                nombre="Precio"
                number
              ></FormTextfield>
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={4}
            item
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <FormTextfield
                id="locStreet"
                onChange={handleFieldChange}
                nombre="Nombre del alojamiento"
              ></FormTextfield>
            </Grid>

            <Grid item xs={6}>
              <FormTextfield
                id="locDoorNumber"
                onChange={handleFieldChange}
                nombre="Nombre del alojamiento"
                number
              ></FormTextfield>
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={4}
            item
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <Servicios
                lista={fields.serviciosApi}
                setValores={setServicios}
              />
            </Grid>

            <Grid item xs={6}>
              <Caracteristicas
                lista={fields.caracteristicasApi}
                setValores={setCaracteristicas}
              />{" "}
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={4}
            item
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <ImageEditor
              itemData={fields.imagenes}
              setItemData={(images) => {
                changeField("imagenes", images);
              }}
            ></ImageEditor>
          </Grid>
          <Grid
            container
            rowSpacing={4}
            item
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ height: "100px" }}
          >
            <Button type="submit">Guardar</Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export function NewReserveAndRegister({
  fields,
  handleFieldChange,
  changeField,
  servicios,
  setServicios,
  caracteristicas,
  setCaracteristicas,
}) {
  const [fieldsInternos, , changeFieldInternos] = useInputsForm({
    serviciosApi: [],
    caracteristicasApi: [],
    apiError: [],
    servicioCargado: false,
  });

  if (servicios.length === 0 || caracteristicas.length === 0) {
    GetCaracteristicas().then((resultado) => {
      resultado.data.servicios = resultado.data.servicios.map((item) => ({
        ...item,
        valor: false,
      }));
      resultado.data.caracteristicas = resultado.data.caracteristicas.map(
        (item) => ({ ...item, cantidad: 0 })
      );
      setServicios(resultado.data.servicios);
      setCaracteristicas(resultado.data.caracteristicas);
      changeFieldInternos("servicioCargado", true);
    });
  }
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#ffffff",
        display: "flex",
        padding: "4%",
        paddingTop: "0",
        margin: "auto",
        marginTop: "2%",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "3px",
      }}
    >
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Typography
            sx={{ textAlign: "center", fontSize: "30px", paddingTop: "20px" }}
          >
            Creacion de Alojamiento
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <FormTextfield
            id="accName"
            onChange={handleFieldChange}
            value={fields.accName}
            nombre="Nombre del alojamiento"
          ></FormTextfield>
        </Grid>
        <Grid item xs={12}>
          <FormTextfield
            id="accDescription"
            onChange={handleFieldChange}
            nombre="Descripcion"
            value={fields.accDescription}
            multiline
            rows={4}
          ></FormTextfield>
        </Grid>
        <Grid
          container
          rowSpacing={4}
          item
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={6}>
            <FormTextfield
              id="locCoordinates"
              value={fields.locCoordinates}
              onChange={handleFieldChange}
              nombre="Coordenadas"
            ></FormTextfield>
          </Grid>
          <Grid item xs={6}>
            <FormTextfield
              id="locCountry"
              value={fields.locCountry}
              onChange={handleFieldChange}
              nombre="Pais"
            ></FormTextfield>
          </Grid>

          <Grid item xs={6}>
            <FormTextfield
              id="locRegion"
              value={fields.locRegion}
              onChange={handleFieldChange}
              nombre="Region"
            ></FormTextfield>
          </Grid>
          <Grid item xs={6}>
            <FormTextfield
              id="accPrice"
              value={fields.accPrice}
              onChange={handleFieldChange}
              nombre="Precio"
            ></FormTextfield>
          </Grid>
        </Grid>
        <Grid
          container
          rowSpacing={4}
          item
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={6}>
            <FormTextfield
              id="locStreet"
              onChange={handleFieldChange}
              value={fields.locStreet}
              nombre="Calle"
            ></FormTextfield>
          </Grid>

          <Grid item xs={6}>
            <FormTextfield
              id="locDoorNumber"
              value={fields.locDoorNumber}
              onChange={handleFieldChange}
              nombre="Numero de puerta"
              number
            ></FormTextfield>
          </Grid>
        </Grid>
        <Grid
          container
          rowSpacing={4}
          item
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={6}>
            <Servicios lista={servicios} setValores={setServicios} />
          </Grid>

          <Grid item xs={6}>
            <Caracteristicas
              lista={caracteristicas}
              setValores={setCaracteristicas}
            />
          </Grid>
        </Grid>

        <Grid
          container
          rowSpacing={4}
          item
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <ImageEditor
            itemData={fields.imagenes}
            setItemData={(images) => {
              changeField("imagenes", images);
            }}
          ></ImageEditor>
        </Grid>
        <Grid
          container
          rowSpacing={4}
          item
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ height: "100px" }}
        ></Grid>
      </Grid>
    </Box>
  );
}
