import React from "react";
import styled from "styled-components";
import MediaQuery from "react-responsive";

//resources
import { starUrl, LogueSvg } from "resources/const/visuals";

const LogueLayout = styled.div`
  height: fit-content;
  width: fit-content;
`;

export default function Logue() {
  return (
    <MediaQuery minWidth={1224}>
      <LogueLayout>
        <LogueSvg width="200px" height="200px" />
      </LogueLayout>
    </MediaQuery>
  );
}
