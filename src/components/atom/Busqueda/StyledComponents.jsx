import styled from "styled-components";
import { styled as materialStyle } from "@mui/system";
import TextField from "@mui/material/TextField";

const BusquedaContainer = styled("div")`
  flex: none;

  order: 1;
  flex-grow: 1;
`;

const Input = materialStyle(TextField)`

`;

export { BusquedaContainer, Input };
