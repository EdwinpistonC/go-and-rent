import { styled as materialstyle } from "@mui/system";
import styled from "styled-components";

import Paper from "@mui/material/Paper";
import px2vw from "resources/const/px2vw";

export const LoginLayout = styled.div`
  display: flex;
  width: ${px2vw(600, 768)};
  height: 80vh;
  justify-self: center;
  align-self: center;
  margin: auto;
  @media (min-width: 768px) {
    min-height: ${px2vw(600, 768)};
    height: 70vh;
    flex-wrap: nowrap;
  }

  @media (min-width: 1024px) {
    min-height: ${px2vw(100)};
    height: 100vh;
  }
`;

export const LoginBase = materialstyle(Paper)`
  & {
    display: flex;
    width: ${px2vw(320, 320)};
    min-height: auto;
    flex-direction: column;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    margin-bottom: 0px;
   
    
    @media (min-width: 768px) {
      width: ${px2vw(320, 768)};
      min-height: ${px2vw(600, 768)};
      height: 70vh;
      margin-left: auto;
      margin-top: ${px2vw(200, 768)};
      margin-right: ${px2vw(50, 768)};
    }

    @media (min-width: 1024px) {
      width: ${px2vw(400)};
      min-height: ${px2vw(100)};
      margin-left: auto;
      margin-right: auto;
      height: 80%;
      margin-top: auto;
      margin-bottom: auto;
    }
  }
`;
