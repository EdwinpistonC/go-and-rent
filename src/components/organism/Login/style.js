import { styled } from "@mui/system";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export const LoginBase = styled(Paper)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: inherit;
  overflow: hidden;
  &:after {
    box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.05);
    filter: blur(10px);
    background: inherit;
  }
`;
export const LayoutTextField = styled(Box)`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 0px;
`;

export const LayoutOptions = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-content: space-around;
  gap: 10%;
  margin-bottom: 5%;
`;
