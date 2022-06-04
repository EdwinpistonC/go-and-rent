import React from "react";
import Container from "@mui/material/Container";

import { SideBarFilter } from "components/organism/SideBarMenu";

export default function Busqueda() {
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  //"Uruguay", "Canelones", "Solymar"
  return (
    <Container
      maxWidth="xs"
      disableGutters
      sx={{
        marginLeft: 0,
        marginTop: 0,
        marginTop: "-10px",
        marginBottom: "-10px",
      }}
    >
      <SideBarFilter />
    </Container>
  );
}
