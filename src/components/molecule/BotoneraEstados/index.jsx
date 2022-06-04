import {Button} from "components/atom/Button"
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';


export default function botoneraEstados(estado){
    const botonAceptar =(estado)=>{
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

    const botonBloquear =(estado)=>{
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

    const botonDesloquear =(estado)=>{
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
    const botonEliminar =(estado)=>{
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
    const botonRechazar =(estado)=>{
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
            {botonAceptar(estado)}
            {botonBloquear(estado)}
            {botonDesloquear(estado)}
            {botonEliminar(estado)}
            {botonRechazar(estado)}
        </div>
    );

}