import React from "react";
import { EditHousing } from "components/organism/NewHousing";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function EditarAlojamiento() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
  let registerReserve;
  return <EditHousing submit={registerReserve} type={""} />;
}
