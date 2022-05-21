import styled from "styled-components";
import { styled as materialStyle } from "@mui/system";
import TextField from "@mui/material/TextField";
import OutlinedInput, {
  outlinedInputClasses,
} from "@mui/material/OutlinedInput";
import { theme, customColors } from "resources/const/Template";

import CiudadNoche from "resources/svgs/CiudadNoche.svg";

const LoginContainer = styled("div")`
  /* Color - White */
  /* foto=derecha */

  /* Auto layout */

  display: flex;
  flex-direction: ${(props) => props.posImagen || 0};

  justify-content: center;
  align-items: center;
  padding: 0px;

  position: absolute;
  width: 100%;
  height: 100%;
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
  width: 491px;
  height: 444px;
  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1;
  background: #ffffff;
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

  background-position: center;
  background-size: cover;
  width: 492px;
  height: 445px;
  /* Inside auto layout */
  position: relative;

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 1;

  -webkit-animation: bg-pan-right ${(props) => props.velocidad + "s"} infinite
    both;
  animation: bg-pan-right ${(props) => props.velocidad + "s"} infinite both;
  animation-direction: ${(props) => props.direccion};
  @-webkit-keyframes bg-pan-right {
    0% {
      background-position: 0 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
  @keyframes bg-pan-right {
    0% {
      background-position: 0 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
`;

const Titulo = styled("label")`
  /* Heading - H2 */

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 53px;
  /* identical to box height, or 110% */
  position: absolute;

  bottom: 2%;
  right: ${(props) => props.right || 0}%;
  left: ${(props) => props.left || 0}%;

  user-select: none;
  color: #ffffff;
`;
const Form = styled("form")`
  /* Inside auto layout */
  /* Auto layout */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 19px;

  /* Inside auto layout */
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  align-items: center;
  justify-content: center;
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

  /* Inside auto layout */

  flex: none;
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

const BtnContainer = styled("div")`
  width: 275px;
  height: 45px;
  display: flex;
  align-items: center;
`;

const Pregunta = styled("a")`
  /* ¿Olvidaste la contraseña ? */

  width: 120px;
  height: 11px;
  cursor: pointer;
  font-family: "Arial";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 11px;
  text-decoration-line: underline;

  color: #000000;

  /* Inside auto layout */

  flex: none;
  order: 3;
  flex-grow: 0;
`;

const BtnRow = styled("div")`
  /* botones */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 2.44px;

  width: 80%;

  /* Inside auto layout */

  flex: none;
  order: 4;
  flex-grow: 0;
`;

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
  BtnContainer,
  Pregunta,
  BtnRow,
};
