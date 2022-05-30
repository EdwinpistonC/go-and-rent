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

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { ModalSmall } from "components/atom/Modal";
import { useLocalStorage } from "Hooks/LocalStoreHook";
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
