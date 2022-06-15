import { Button } from "components/atom/Button";
import { AccessAlarm, ThreeDRotation } from "@mui/icons-material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
//import Api from "server/Api";
import SimpleModal from "./modalBotonera"

export default function botoneraEstados(estado,alias,actualizarTabla) {
  //const backend = new Api();
  const botonAceptar = (estado,alias,actualizarTabla) => {
    if (estado == "ESPERANDO") {
      return (
        // <Button
        //   onClick={(alias) => {
        //     backend.aceptarUsuarios(alias).then((response)=>{
        //       console.log(response.data)
        //      })
        //   }}
        //   style={{
        //     backgroundColor: "#33b047",
        //   }}
        // >
        //   Aceptar
        // </Button>
        <SimpleModal
        boton="Aceptar"
        alias={alias}
        actualizarTabla={actualizarTabla}
        ></SimpleModal>
      );
    }
    return <></>;
  };

  const botonBloquear = (estado,alias,actualizarTabla) => {
    if (estado == "ACEPTADO") {
      return (
        // <Button
        //   onClick={(alias) => {
        //     backend.aceptarUsuarios(alias).then((response)=>{
        //       console.log(response.data)
        //      })
        //   }}
        //   style={{
        //     backgroundColor: "#ecab40",
        //   }}
        // >
        //   Bloquear
        // </Button>
        <SimpleModal
        boton="Bloquear"
        alias={alias}
        actualizarTabla={actualizarTabla}
        ></SimpleModal>
      );
    }
    return <></>;
  };

  const botonDesbloquear = (estado,alias,actualizarTabla) => {
    if (estado == "BLOQUEADO") {
      return (
        // <Button         
        //   onClick={(alias) => {
        //     backend.desbloquearUsuarios(alias).then((response)=>{
        //       console.log(response.data)
        //     })
        //   }}
        //   style={{
        //     backgroundColor: "#ecab40",
        //   }}
        // >
        //   Desbloquear
        // </Button>
        <SimpleModal
        boton="Desbloquear"
        alias={alias}
        actualizarTabla={actualizarTabla}
        ></SimpleModal>
      );
    }
    return <></>;
  };
  const botonEliminar = (estado,alias,actualizarTabla) => {
    if (estado == "ACEPTADO") {
      return (
        // <Button
        //   // onClick={(alias) => {
        //   //   // backend.elimiarUsuarios(alias).then((response)=>{
        //   //   //   console.log(response.data)
        //   //   // })
        //   //   SimpleModal()
        //   // }}
        //   onClick={() => {
        //   onSecundario2();
        //   cerrarModal();
        //   }}
        //   style={{
        //     backgroundColor: "#e53c41",
        //   }}
        // >
        //   Eliminar
        // </Button>
        <SimpleModal
        boton="Eliminar"
        alias={alias}
        actualizarTabla={actualizarTabla}
        ></SimpleModal>
      );
    }
    return <></>;
  };
  const botonRechazar = (estado,alias,actualizarTabla) => {
    if (estado == "ESPERANDO") {
      return (
        // <Button
        //   onClick={(alias) => {
        //     backend.rechazarUsuarios(alias).then((response)=>{
        //       console.log(response.data)
        //     })
        //   }}
        //   style={{
        //     backgroundColor: "#e53c41",
        //   }}
        // >
        //   Rechazar
        // </Button>
        <SimpleModal
        boton="Rechazar"
        alias={alias}
        actualizarTabla={actualizarTabla}
        ></SimpleModal>
      );
    }
    return <></>;
  };
  return (
    <div>
      {botonAceptar(estado,alias,actualizarTabla)}
      {botonBloquear(estado,alias,actualizarTabla)}
      {botonDesbloquear(estado,alias,actualizarTabla)}
      {botonEliminar(estado,alias,actualizarTabla)}
      {botonRechazar(estado,alias,actualizarTabla)}
    </div>
  );
}
