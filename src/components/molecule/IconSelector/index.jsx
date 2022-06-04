import React from "react";
import { Grid, Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Assignment from "@mui/icons-material/Assignment";
import { green, pink, red } from "@mui/material/colors";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function IconSelector({ avatar, setAvatar }) {
  if (avatar == 0) {
    setAvatar(1);
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="stretch"
      spacing={1}
    >
      <IconButton onClick={() => setAvatar(1)}>
        <Avatar
          sx={{ bgcolor: green[500] }}
          style={{
            border: avatar == 1 ? "2px solid black" : "",
          }}
        >
          <AssignmentIcon />
        </Avatar>
      </IconButton>
      <IconButton onClick={() => setAvatar(2)}>
        <Avatar
          sx={{ bgcolor: pink[600] }}
          style={{
            border: avatar == 2 ? "2px solid black" : "",
          }}
        >
          <AssignmentIcon />
        </Avatar>
      </IconButton>
      <IconButton onClick={() => setAvatar(3)}>
        <Avatar
          sx={{ bgcolor: red[700] }}
          style={{
            border: avatar == 3 ? "2px solid black" : "",
          }}
        >
          <AssignmentIcon />
        </Avatar>
      </IconButton>
    </Grid>
  );
}