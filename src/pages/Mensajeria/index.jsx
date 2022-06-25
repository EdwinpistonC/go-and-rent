import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";

import { useLocalStorage } from "Hooks/LocalStoreHook";

import { firebaseConfig } from "server/Firebase";
import { db } from "server/Firebase";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import React from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SendIcon from "@mui/icons-material/Send";
import {
  Divider,
  TextField,
  Typography,
  Grid,
  Paper,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab,
} from "@mui/material";

firebase.initializeApp(firebaseConfig);

const PreviewChat = ({ data, onClick, soy }) => {
  let alias = data.huesped;
  if (soy === "ROLE_GUEST") {
    alias = data.anfitrion;
  }
  return (
    <ListItem button key="RemySharp" onClick={onClick}>
      <ListItemIcon>
        <MailOutlineIcon />
      </ListItemIcon>
      <ListItemText primary={alias}>{alias}</ListItemText>
      <ListItemText secondary={data.housingName} align="right"></ListItemText>
    </ListItem>
  );
};

const Chat = () => {
  const [usuario] = useLocalStorage("usuario", "");
  const [previews, setPreviews] = React.useState("");
  const [chatSeleccionado, setChatSeleccionado] = React.useState(-1);
  const [msgs, setMsgs] = React.useState([]);
  const [text, setText] = React.useState("");
  const [bloquear, setBloquear] = React.useState(false);

  React.useEffect(() => {
    const usersRef = collection(db, "chats");
    let rol = "anfitrion";
    if (usuario.rol === "ROLE_GUEST") {
      rol = "huesped";
    }
    const q = query(usersRef, where(rol, "in", [usuario.alias]));

    const unsub = onSnapshot(q, (querySnapshop) => {
      let user = [];
      querySnapshop.forEach((doc) => {
        user.push({
          startDate: doc.data().fechaInicioReserva,
          huesped: doc.data().huesped,
          anfitrion: doc.data().anfitrion,
          endDate: doc.data().fechaFinReserva,
          housingName: doc.data().nombreAlojamiento,
          housingId: doc.data().idAlojamiento,
          bookingId: doc.data().idReserva,
        });
      });
      setPreviews(user);
    });
    return () => unsub();
  }, [usuario.rol, usuario.alias]);

  const handleSubmit = async () => {
    if (text.trim() !== "") {
      const id =
        `${previews[chatSeleccionado].huesped}` +
        "-" +
        `${previews[chatSeleccionado].anfitrion}` +
        "-" +
        `${previews[chatSeleccionado].housingId}` +
        "-" +
        `${previews[chatSeleccionado].bookingId}`;
      let para = msgs[0].para;
      if (msgs[0].de !== usuario.alias) {
        para = msgs[0].de;
      }
      await addDoc(collection(db, "chats", id, "mensajes"), {
        texto: text,
        de: usuario.alias,
        para: para,
        fechaCreacion: Timestamp.fromDate(new Date()),
      });
      await setDoc(doc(db, "ultimosMsg", id), {
        texto: text,
        para: para,
        de: usuario.alias,
        fechaCreacion: Timestamp.fromDate(new Date()),
        noLeido: true,
      }).then(() => console.log("seteo"));

      setText("");
      setBloquear(false);
    }
  };

  React.useEffect(() => {
    if (chatSeleccionado !== -1) {
      const readMessage = async () => {
        const id =
          `${previews[chatSeleccionado].huesped}` +
          "-" +
          `${previews[chatSeleccionado].anfitrion}` +
          "-" +
          `${previews[chatSeleccionado].housingId}` +
          "-" +
          `${previews[chatSeleccionado].bookingId}`;
        const docSnap = await getDoc(doc(db, "ultimosMsg", id));
        if (docSnap.data()?.de !== usuario.alias) {
          await updateDoc(doc(db, "ultimosMsg", id), { noLeido: false });
        }
      };
      const id =
        `${previews[chatSeleccionado].huesped}` +
        "-" +
        `${previews[chatSeleccionado].anfitrion}` +
        "-" +
        `${previews[chatSeleccionado].housingId}` +
        "-" +
        `${previews[chatSeleccionado].bookingId}`;
      const msgsRef = collection(db, "chats", id, "mensajes");
      const q = query(msgsRef, orderBy("fechaCreacion", "asc"));
      const mens = onSnapshot(q, (querySnapshot) => {
        let msgs = [];
        querySnapshot.forEach((doc) => {
          msgs.push(doc.data());
        });
        setMsgs(msgs);
        readMessage();
      });
      return () => mens();
    }
  }, [chatSeleccionado, previews, usuario.alias]);

  return (
    <Card sx={{ marginY: "-10px" }}>
      <Grid container sx={{ marginY: "20px", marginLeft: "10%" }}>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} sx={{ width: "100%" }}>
        <Grid item xs={3} sx={{ borderRight: "1px solid #e0e0e0" }}>
          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Buscar..."
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />
          <List>
            {previews !== "" &&
              previews.map((preview, key) => {
                return (
                  <PreviewChat
                    onClick={() => setChatSeleccionado(key)}
                    key={key}
                    data={preview}
                    soy={usuario.rol}
                  ></PreviewChat>
                );
              })}
          </List>
        </Grid>
        {chatSeleccionado !== -1 ? (
          <Grid item xs={9}>
            <List sx={{ height: "70vh", overflowY: "auto" }}>
              {msgs.length !== 0 &&
                msgs.map((msg, key) => {
                  if (msg.de === usuario.alias) {
                    return (
                      <ListItem key={key}>
                        <Grid container>
                          <Grid item xs={12}>
                            <ListItemText
                              align="right"
                              primary={msg.texto}
                            ></ListItemText>
                          </Grid>
                          <Grid item xs={12}>
                            <ListItemText
                              align="right"
                              secondary="09:30"
                            ></ListItemText>
                          </Grid>
                        </Grid>
                      </ListItem>
                    );
                  }
                  return (
                    <ListItem key={key}>
                      <Grid container>
                        <Grid item xs={12}>
                          <ListItemText
                            align="left"
                            primary={msg.texto}
                          ></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                          <ListItemText
                            align="left"
                            secondary="09:31"
                          ></ListItemText>
                        </Grid>
                      </Grid>
                    </ListItem>
                  );
                })}
            </List>
            <Divider />
            <Grid container style={{ padding: "20px" }}>
              <Grid item xs={11}>
                <TextField
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  disabled={bloquear}
                  id="outlined-basic-email"
                  label="Escribir mensaje"
                  fullWidth
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                      setBloquear(true);
                    }
                  }}
                />
              </Grid>
              <Grid item xs={1} align="right">
                <Fab color="primary" aria-label="add" onClick={handleSubmit}>
                  <SendIcon />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={9}>
            <List sx={{ height: "70vh", overflowY: "auto" }}></List>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default Chat;
