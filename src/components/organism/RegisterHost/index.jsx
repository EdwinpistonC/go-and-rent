import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Typography from "@mui/material/Typography";
import { useInputsForm } from "Hooks/Inputhooks";
import StepLabel from "@mui/material/StepLabel";
import { formatDate } from "components/util/functions";
import {
  FormTextfield,
  PasswordTextfield,
  DatePicker,
} from "components/atom/Textfield";
import { Grid, MenuItem, FormControl, InputLabel } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Avatar from "@mui/material/Avatar";
import { green, pink, red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import { Button } from "components/atom/Button";
import { NewReserveAndRegister } from "../NewHousing";
import {
  Columna,
  Form,
  H1,
  ErrorLabel,
  EmptyLabel,
} from "components/organism/FormModal/StyledComponents";
import { BusquedaField } from "components/atom/Busqueda";
import Select from "@mui/material/Select";

const steps = [
  "Información del usuario",
  "Información de alojamiento",
  "Finalizar",
];

export default function RegisterHost({ submit }) {
  const [fields, handleFieldChange, changeField] = useInputsForm({
    skipped: new Set(),
    activeStep: 0,
    alias: "",
    email: "",
    contra: "",
    apellido: "",
    nombre: "",
    telefono: "",
    avatar: 0,
    fechaNacimiento: {},
    apiError: "",
    locCoordinates: [],
    locCountry: [],
    locRegion: [],
    accPrice: [],
    locStreet: [],
    imagenes: [],
    locDoorNumber: [],
    accName: [],
    accDescription: [],
    bank: "",
    account: "",
    usuarioRegistrado: false,
  });
  const [servicios, setServicios] = React.useState([]);
  const [caracteristicas, setCaracteristicas] = React.useState([]);

  const callSubmit = () => {
    console.log(fields.fechaNacimiento);
    console.log(new Date(fields.fechaNacimiento));

    console.log(formatDate(new Date(fields.fechaNacimiento)));

    submit(
      fields.alias,
      fields.email,
      fields.contra,
      fields.apellido,
      fields.nombre,
      fields.telefono,
      fields.avatar,
      formatDate(new Date(fields.fechaNacimiento)),
      fields.bank,
      fields.account,
      fields.locCoordinates,
      fields.locCountry,
      fields.accPrice,
      fields.locStreet,
      fields.imagenes,
      fields.locDoorNumber,
      fields.accName,
      fields.accDescription,
      servicios,
      caracteristicas
    )
      .then((response) => {
        changeField("apiError", "");
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        if (err.response.status === 401) {
          changeField("apiError", "Datos incorrectos");
        } else {
          changeField("apiError", err.response.data);
        }
      });
  };

  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return fields.skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = fields.skipped;
    if (isStepSkipped(fields.activeStep)) {
      newSkipped = new Set(newSkipped.values());

      newSkipped.delete(fields.activeStep);
    }
    changeField("activeStep", fields.activeStep + 1);

    changeField("skipped", newSkipped);
  };

  const handleBack = () => {
    changeField("activeStep", fields.activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(fields.activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    changeField("activeStep", fields.activeStep + 1);
    const newSkipped = new Set(fields.skipped.values());
    newSkipped.add(fields.activeStep);

    changeField("skipped", newSkipped);
  };
  const handleReset = () => {
    changeField("activeStep", 0);
  };

  const datosAnfitrion = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "center",
          alignItems: "center",
          padding: "0px",
          width: "100%",
          minHeight: "50vh",
          marginTop: "2%",

          height: "100%",
        }}
      >
        <Columna sx={{ minHeight: "50vh" }}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
          >
            <H1>Registro</H1>
            <Box
              sx={{
                marginInline: "5%",
                minHeight: "50vh",
                width: "80%",
                margin: "auto",
              }}
            >
              <Grid
                container
                spacing={0}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                columns={12}
              >
                <Grid item container direction="column" xs spacing={6}>
                  <Grid item xs>
                    <FormTextfield
                      id="alias"
                      onChange={handleFieldChange}
                      nombre="Alias"
                      value={fields.alias}
                    />
                  </Grid>
                  <Grid item xs>
                    <FormTextfield
                      id="nombre"
                      onChange={handleFieldChange}
                      nombre="Nombre"
                      value={fields.nombre}
                    />
                  </Grid>
                  <Grid item xs>
                    <PasswordTextfield
                      id="contra"
                      onChange={handleFieldChange}
                      nombre="Contraseña"
                      value={fields.contra}
                    />
                  </Grid>
                  <Grid item xs>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Banco
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="bank"
                        name="bank"
                        value={fields.bank}
                        onChange={(e) => {
                          console.log(e.target.value);
                          changeField("bank", e.target.value);
                        }}
                        fullWidth
                        label="Banco"
                      >
                        <MenuItem value={"SANTANDER"}>SANTANDER</MenuItem>
                        <MenuItem value={"BROU"}>BROU</MenuItem>
                        <MenuItem value={"BBVA"}>BBVA</MenuItem>
                        <MenuItem value={"ITAU"}>ITAU</MenuItem>
                        <MenuItem value={"SCOTIABANK"}>SCOTIABANK</MenuItem>
                        <MenuItem value={"HSBC"}>HSBC</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs>
                    <FormTextfield
                      id="telefono"
                      onChange={handleFieldChange}
                      nombre="Teléfono/Celular"
                      value={fields.telefono}
                    />
                  </Grid>
                </Grid>
                <Grid item container direction="column" xs spacing={7}>
                  <Grid item xs>
                    <FormTextfield
                      id="email"
                      onChange={handleFieldChange}
                      nombre="Correo electrónico"
                      value={fields.email}
                    />
                  </Grid>
                  <Grid item xs>
                    <FormTextfield
                      id="apellido"
                      onChange={handleFieldChange}
                      nombre="Apellido"
                      value={fields.apellido}
                    />
                  </Grid>

                  <Grid item xs>
                    <DatePicker
                      id="fechaNacimiento"
                      label="Fecha de nacimiento"
                      fecha={fields.fechaNacimiento}
                      format="DD/MM/YYYY"
                      minDate={new Date("1/1/2004").toString()}
                      onChange={(e) => {
                        console.log(e);
                        changeField("fechaNacimiento", e);
                      }}
                      value={fields.fechaNacimiento}
                    ></DatePicker>
                  </Grid>

                  <Grid item xs>
                    <FormTextfield
                      id="account"
                      onChange={handleFieldChange}
                      nombre="Numero de cuenta"
                      value={fields.account}
                    />
                  </Grid>
                  <Grid item xs>
                    <IconButton onClick={() => changeField("avatar", 1)}>
                      <Avatar
                        sx={{ bgcolor: green[500] }}
                        style={{
                          border: fields.avatar === 1 ? "2px solid black" : "",
                        }}
                      >
                        <AssignmentIcon />
                      </Avatar>
                    </IconButton>
                    <IconButton onClick={() => changeField("avatar", 2)}>
                      <Avatar
                        sx={{ bgcolor: pink[600] }}
                        style={{
                          border: fields.avatar === 2 ? "2px solid black" : "",
                        }}
                      >
                        <AssignmentIcon />
                      </Avatar>
                    </IconButton>
                    <IconButton onClick={() => changeField("avatar", 3)}>
                      <Avatar
                        sx={{ bgcolor: red[700] }}
                        style={{
                          border: fields.avatar === 3 ? "2px solid black" : "",
                        }}
                      >
                        <AssignmentIcon />
                      </Avatar>
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Form>
        </Columna>
      </Box>
    );
  };

  const datosAlojamiento = () => {
    return (
      <NewReserveAndRegister
        fields={fields}
        handleFieldChange={handleFieldChange}
        changeField={changeField}
        servicios={servicios}
        setServicios={setServicios}
        setCaracteristicas={setCaracteristicas}
        caracteristicas={caracteristicas}
      ></NewReserveAndRegister>
    );
  };

  const finalizar = () => {
    return;
  };

  const renderSwitch = (key) => {
    switch (key) {
      case 0:
        return datosAnfitrion();
      case 1:
        return datosAlojamiento();
      case 2:
        return finalizar();
      default:
        alert("error en renderSwitch");
        return;
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        minHeight: "50vh",
        marginTop: 0,
        marginBottom: "auto",
      }}
    >
      {fields.usuarioRegistrado ? (
        <Typography></Typography>
      ) : (
        <>
          <Box
            sx={{
              width: "80%",
              height: "100%",
              minHeight: "50vh",
              marginTop: 0,
              alignContent: "center",
              margin: "auto",
            }}
          >
            <Stepper activeStep={fields.activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography variant="caption">Optional</Typography>
                  );
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {fields.activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {renderSwitch(fields.activeStep)}

                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={fields.activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Volver
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {isStepOptional(fields.activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                      Saltar
                    </Button>
                  )}
                  {fields.apiError !== "" ? (
                    <ErrorLabel>{fields.apiError}</ErrorLabel>
                  ) : (
                    <EmptyLabel />
                  )}

                  {fields.activeStep === steps.length - 1 ? (
                    <Button onClick={callSubmit}> Finalizar</Button>
                  ) : (
                    <Button onClick={handleNext}> Siguiente</Button>
                  )}
                </Box>
              </React.Fragment>
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "fit-content",
              top: 0,
              alignContent: "center",
            }}
          ></Box>
        </>
      )}
    </Box>
  );
}
