
import {Link} from "react-router-dom";
//import Api from "server/Api";
import SimpleModal from "./modalBotonera"
import Api from "server/Api";
import { Button } from "components/atom/Button";
const backend = new Api();
function botonAceptar (alias) {
    return (
    //   <Button 
    //     style={{ backcolor: "#33b047 !importan"}}
    //     onClick={() => {
    //           backend.aceptarUsuarios(alias).then((response)=>{
    //             console.log(response.data);
    //           }).catch((response)=>{
    //             alert("Hubo un error intentelo más tarde.");
    //             console.error(response.data);
    //           });
    //         }}
    //   >
    // ACEPTAR
    // </Button>
    <SimpleModal
      boton="Aceptar"
      alias={alias}

      ></SimpleModal>
    );
};
function botonRechazar (alias) {
  
    return (
    //   <Button 
    //     style={{ backcolor: "#e53c41 !importan"}}
    //     onClick={() => {
    //           backend.aceptarUsuarios(alias).then((response)=>{
    //             console.log(response.data);
    //           }).catch((response)=>{
    //             alert("Hubo un error intentelo más tarde.");
    //             console.error(response.data);
    //           });
    //         }}
    //   >
    // Rechazar
    // </Button>
     <SimpleModal
     boton="Rechazar"
     alias={alias}
     ></SimpleModal>
    );

};

function botonBloquear (estado,alias,actualizarTabla) {
  if (estado == "ACEPTADO") {
    return (
      <SimpleModal
      boton="Bloquear"
      alias={alias}
      actualizarTabla={actualizarTabla}
      ></SimpleModal>
    );
  }
  return <></>;
};

function botonDesbloquear  (estado,alias,actualizarTabla) {
  if (estado == "BLOQUEADO") {
    return (
      <SimpleModal
      boton="Desbloquear"
      alias={alias}
      actualizarTabla={actualizarTabla}
      ></SimpleModal>
    );
  }
  return <></>;
};
function botonEliminar(estado,alias,actualizarTabla){
  if (estado == "ACEPTADO") {
    return (
      <SimpleModal
      boton="Eliminar"
      alias={alias}
      actualizarTabla={actualizarTabla}
      ></SimpleModal>
    );
  }
  return <></>;
};


function botoneraEstados(estado,alias,actualizarTabla,accommodationId) {

  
  const btnVerAprobacion = ()=>{
    if (estado == "ESPERANDO") {
      return(
        <Button variant="contained" href={`/Admin/aprobarUsuarios/${accommodationId}/${alias}`}>
          Para aprobar 
        </Button>
      )
    }
    return <></>;
  }

  return (
    <div>
      {btnVerAprobacion(estado,alias)}
      {botonBloquear(estado,alias,actualizarTabla)}
      {botonDesbloquear(estado,alias,actualizarTabla)}
      {botonEliminar(estado,alias,actualizarTabla)}
    </div>
  );
}


 export { botoneraEstados,botonAceptar,botonBloquear,botonDesbloquear,botonEliminar,botonRechazar }