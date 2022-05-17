import styled from "styled-components";
import { styled as materialStyle } from "@mui/system";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const ModalSC = materialStyle(Modal)`

`;

const BoxSC = materialStyle(Box)`
 /* foto=derecha */


/* Auto layout */

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;

position: absolute;
width: 1177px;
height: 589px;
left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

/* Color - White */

background: #FFFFFF;
border-radius: 30px;
`;
export { ModalSC, BoxSC };
