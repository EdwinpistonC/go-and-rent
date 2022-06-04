import React from "react";

import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

const Alert = () => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.01 20.01C7.01 21.11 7.9 22 9 22C10.1 22 10.99 21.11 10.99 20.01H7.01ZM9 5C11.76 5 14 7.24 14 10V17H4V10C4 7.24 6.24 5 9 5ZM9 0.5C8.17 0.5 7.5 1.17 7.5 2V3.17C4.36 3.85 2 6.65 2 10V16L0 18V19H18V18L16 16V10C16 6.65 13.64 3.85 10.5 3.17V2C10.5 1.17 9.83 0.5 9 0.5ZM8 7H10V11H8V7ZM8 13H10V15H8V13Z"
        fill="#323232"
      />
    </svg>
  );
};
const Messages = () => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 2V9H3.17L2.58 9.59L2 10.17V2H13ZM14 0H1C0.45 0 0 0.45 0 1V15L4 11H14C14.55 11 15 10.55 15 10V1C15 0.45 14.55 0 14 0ZM19 4H17V13H4V15C4 15.55 4.45 16 5 16H16L20 20V5C20 4.45 19.55 4 19 4Z"
        fill="#323232"
      />
    </svg>
  );
};

const Bookings = () => {
  return <HolidayVillageIcon></HolidayVillageIcon>;
};

const  iconoEstados = (estado)=>{
  let icono =()=>{return(<></>);} 
  if(estado == 'ACEPTADO'){
    icono =()=>{return(<DoneIcon style={{color:"#33b047"}}></DoneIcon>);} 
  }else if(estado == 'BLOQUEADO'){ 
    icono =()=>{return(<DoDisturbIcon style={{color:"#d55a34"}}></DoDisturbIcon>);} 
  }else if(estado == 'ELIMINADO'){
    icono =()=>{return(<DeleteForeverIcon style={{color:"#e53c41"}}></DeleteForeverIcon>);} 
  }else if(estado == 'ESPERANDO'){
    icono =()=>{return(<HourglassBottomIcon style={{color:"#ecab40"}}></HourglassBottomIcon>);} 
  }
  return(icono);
}

export { Messages, Alert, Bookings,iconoEstados };
