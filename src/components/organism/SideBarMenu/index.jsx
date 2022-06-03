import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { useInputsForm } from "Hooks/Inputhooks";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { ModalSmall } from "components/atom/Modal";
import { useLocalStorage } from "Hooks/LocalStoreHook";
import { FormControlLabel, Checkbox, Grid } from "@mui/material";
import Api from "server/Api";
import TextField from "components/atom/Textfield";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import * as locales from "react-date-range/dist/locale";

function GetCaracteristicas() {
  const backend = new Api();
  return backend.features();
}

const drawerWidth = 240;

export default function SideBarMenu() {
  const navegar = useNavigate();
  const [alertaCerrarSesion, setAlerta] = React.useState(false);

  const handleOpen = () => setAlerta(true);
  const handleClose = () => setAlerta(false);
  const [usuario, setUsuario] = useLocalStorage("usuario", "");

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <ModalSmall abrirModal={alertaCerrarSesion} onCloseModal={handleClose}>
        <Stack spacing={2} direction="column">
          <label>¿Desea cerrar sesión?</label>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
                localStorage.removeItem("usuario");
                navegar("/");
              }}
            >
              Si
            </Button>
            <Button variant="contained" onClick={handleClose}>
              No
            </Button>
          </Stack>
        </Stack>
      </ModalSmall>
      <Divider />
      <List>
        <ListItem key={"usuarios"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"usuarios"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          key={"Perfil"}
          disablePadding
          onClick={() => navegar("/perfil")}
        >
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Perfil"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Cerrar Sesión"} disablePadding onClick={handleOpen}>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Cerrar Sesión"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
export function SideBarFilter() {
  const [servicios, setServicios] = React.useState([]);
  const [caracteristicas, setCaracteristicas] = React.useState([]);
  const [fields, handleFieldChange, changeField] = useInputsForm({
    fechas: [
      {
        startDate: new Date(),
        endDate: null,
        key: "selection",
      },
    ],
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
    apiCargada: false,
  });

  if (!fields.apiCargada) {
    changeField("apiCargada", true);
    GetCaracteristicas().then((resultado) => {
      resultado.data.servicios.map((item) => (item.valor = false));
      resultado.data.caracteristicas.map((item) => (item.cantidad = 0));
      console.log(resultado);
      changeField("serviciosApi", resultado.data.servicios);
      changeField("caracteristicasApi", resultado.data.caracteristicas);
    });
  }
  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        height: "100vh",
        gap: "10px",
        paddingBlock: "15px",
        paddingInline: "10px",
      }}
    >
      <FormControl fullWidth variant="filled" sx={{ minWidth: 120 }}>
        <DateRange
          editableDateInputs={true}
          locale={locales["es"]}
          onChange={(item) => {
            //console.log(item);
            changeField("fechas", [item.selection]);
          }}
          ranges={fields.fechas}
        />
        {fields.serviciosApi.length > 0 &&
          fields.serviciosApi.map(function renderFields(servicio, index) {
            return (
              <FormControlLabel
                key={"servicio" + index}
                control={
                  <Checkbox
                    checked={servicio.valor}
                    onChange={(value) => {
                      let _servicios = fields.serviciosApi;
                      _servicios[index] = value;

                      changeField("serviciosApi", _servicios);
                    }}
                  />
                }
                label={servicio.name}
              />
            );
          })}
        {fields.caracteristicasApi.length > 0 &&
          fields.caracteristicasApi.map(function renderFields(
            caracteristica,
            index
          ) {
            return (
              <TextField
                key={"caracteristica" + index}
                label={caracteristica.name}
                value={caracteristica.cantidad}
                onChange={(value) => {
                  let _caracteristica = fields.caracteristicasApi;
                  _caracteristica[index] = value;

                  changeField("caracteristicasApi", _caracteristica);
                }}
              ></TextField>
            );
          })}
      </FormControl>
      <Grid>
        <Grid></Grid> <Grid></Grid>
      </Grid>
    </Box>
  );
}
