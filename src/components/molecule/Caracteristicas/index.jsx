import React from "react";

import { Box } from "@mui/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import { Grid } from "@mui/material";
import TextField from "components/atom/Textfield";

export function Servicios({ lista }) {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <Box>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {lista.map((caracteristica, i) => {
          const labelId = `checkbox-list-label-${i}`;

          return (
            <ListItem
              key={i}
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={handleToggle(i)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(i) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={caracteristica.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
export function Caracteristicas({ lista }) {
  return (
    <Box>
      <Grid container spacing={3}>
        {lista.map((caracteristica, i) => {
          return (
            <Grid item xs>
              <TextField id={i} label={caracteristica.name} type="number" />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
