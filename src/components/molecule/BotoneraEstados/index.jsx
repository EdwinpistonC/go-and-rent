import {Button} from "components/atom/Button"
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';


export default function botoneraEstados(estado,alias){
    const botonAceptar =(estado,alias)=>{
        if(estado == 'ESPERANDO'){
            return(

                <Button
                    // onClick={() => {
                    // onSecundario2();
                    // cerrarModal();
                    // }}v
                    style={{
                        backgroundColor: "#33b047"
                    }}

                >
                Aceptar
                </Button>

            )
        }
        return (<></>);
    };

    const botonBloquear =(estado,alias)=>{
        if(estado == 'ACEPTADO'){
            return(
                <Button
                    // onClick={() => {
                    // onSecundario2();
                    // cerrarModal();
                    // }}v
                    style={{
                        backgroundColor: "#ecab40"
                    }}
                >
                Bloquear
                </Button>
            )
        }
        return (<></>);
    };

    const botonDesloquear =(estado,alias)=>{
        if(estado == 'BLOQUEADO'){
            return(
                <Button
                    // onClick={() => {
                    // onSecundario2();
                    // cerrarModal();
                    // }}v
                    style={{
                        backgroundColor: "#ecab40"
                    }}
                >
                Desbloquear
                </Button>
            )
        }
        return (<></>);
    };
    const botonEliminar =(estado,alias)=>{
        if(estado == 'ACEPTADO'){
            return(
                <Button
                    // onClick={() => {
                    // onSecundario2();
                    // cerrarModal();
                    // }}v
                    style={{
                        backgroundColor: "#e53c41"
                    }}
                >
                Eliminar
                </Button>
            )
        }
        return (<></>);
    };
    const botonRechazar =(estado,alias)=>{
        if(estado == 'ESPERANDO'){
            return(
                <Button
                    // onClick={() => {
                    // onSecundario2();
                    // cerrarModal();
                    // }}v
                    style={{
                        backgroundColor: "#e53c41"
                    }}
                    
                >
                Rechazar
                </Button>
            )
        }
        return (<></>);
    };
    return(
        <div>
            {botonAceptar(estado,alias)}
            {botonBloquear(estado,alias)}
            {botonDesloquear(estado,alias)}
            {botonEliminar(estado,alias)}
            {botonRechazar(estado,alias)}
        </div>
    );

}