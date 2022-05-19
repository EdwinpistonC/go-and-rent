import styled from "styled-components";
import { styled as materialStyle } from "@mui/system";
import TextField from "@mui/material/TextField";
import OutlinedInput, {
  outlinedInputClasses,
} from "@mui/material/OutlinedInput";
import { theme, customColors } from "resources/const/Template";

import CiudadNoche from "resources/svgs/CiudadNoche.svg";
import ImagenJpg from "resources/images/pikb29.jpg";

const LoginContainer = styled("div")`
  /* Color - White */
  /* foto=derecha */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;

  position: absolute;
  width: 100%;
  height: 100%;

  background: #ffffff;
  border-radius: 30px;
`;

const Columna = styled("div")`
  /* Frame 11 */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 19px;
  width: 588.5px;
  height: 589px;
  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1;
`;

const Center = styled("div")`
  padding: 0px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 19px;
  box-sizing: border-box;
`;

const Imagen = styled("div")`
  /* Rectangle 41 */

  background: url(${CiudadNoche});

  border-radius: 0px 30px 0px 0px;
  background-position: center;
  background-size: auto;
  width: 588.5px;
  height: 589px;
  /* Inside auto layout */
  position: relative;

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 1;
`;

const Titulo = styled("h4")`
  /* Heading - H2 */

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 53px;
  /* identical to box height, or 110% */
  position: absolute;
  bottom: 0;
  right: 27px;
  user-select: none;
  color: #ffffff;
`;
const Form = styled("form")`
  /* Inside auto layout */
  gap: 19px;

  /* Inside auto layout */
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  align-items: center;
`;

const H1 = styled("h1")`
  /* Titulo */

  /* Heading - H4 */

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 35px;
  /* identical to box height, or 110% */

  text-align: center;

  color: #000000;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const InputsContainer = styled("div")`
  /* Frame 14 */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 8px;

  width: 80%;
  padding-left: 10%;
  height: 235px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

const Input = materialStyle(TextField)`
/* Atomo| InputForm */


width: 100%;
height: 73px;


/* Inside auto layout */

flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;
`;

const CustomOutilinedInput = materialStyle(OutlinedInput)(`
  & .${outlinedInputClasses.notchedOutline} {
    border-color: ${customColors.primary};
  }
  &:hover .${outlinedInputClasses.notchedOutline} {
    border-color: blue;
  }
  &.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline} {
    border-color: lime;
  }
`);
export {
  LoginContainer,
  Columna,
  Imagen,
  Titulo,
  Form,
  H1,
  InputsContainer,
  Input,
  Center,
  CustomOutilinedInput,
};
