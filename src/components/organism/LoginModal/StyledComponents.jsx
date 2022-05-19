import styled from "styled-components";
import CiudadNoche from "resources/svgs/CiudadNoche.svg";

const LoginContainer = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;

  position: absolute;
  width: 1177px;
  height: 589px;
  left: 20px;
  top: 20px;

  /* Color - White */

  background: #ffffff;
  border-radius: 30px;
`;

const Columna = styled("div")`
  width: 588.5px;
  height: 589px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1;
`;

const Imagen = styled("div")`
  /* Rectangle 41 */

  width: 615.5px;
  height: 589px;

  border-radius: 0px 30px 0px 0px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 1;
`;

const SvgImg = () => {
  return (
    <svg
      width="616"
      height="589"
      viewBox="0 0 616 589"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path
        d="M0.5 0H586C602.569 0 616 13.4315 616 30V589H0.5V0Z"
        fill="url(#pattern0)"
      />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_759_6563"
            transform="translate(-0.0404136 -0.0579548) scale(0.000369503)"
          />
        </pattern>
        <image
          id="image0_759_6563"
          width="4096"
          height="2053"
        />
      </defs>
    </svg>
  );
};

export { LoginContainer, Columna, Imagen, SvgImg };