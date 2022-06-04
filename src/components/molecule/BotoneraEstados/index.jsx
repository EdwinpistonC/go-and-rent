import {Button} from "components/atom/Button"
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';


<<<<<<< HEAD
export default function botoneraEstados(estado){
    const botonAceptar =(estado)=>{
=======
export default function botoneraEstados(estado,alias){
    const botonAceptar =(estado,alias)=>{
>>>>>>> parent of 98ff499 (Merge pull request #22 from EdwinpistonC/revert-21-G390-Listado-usuarios)
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

<<<<<<< HEAD
    const botonBloquear =(estado)=>{
=======
    const botonBloquear =(estado,alias)=>{
>>>>>>> parent of 98ff499 (Merge pull request #22 from EdwinpistonC/revert-21-G390-Listado-usuarios)
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

<<<<<<< HEAD
    const botonDesloquear =(estado)=>{
=======
    const botonDesloquear =(estado,alias)=>{
>>>>>>> parent of 98ff499 (Merge pull request #22 from EdwinpistonC/revert-21-G390-Listado-usuarios)
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
<<<<<<< HEAD
    const botonEliminar =(estado)=>{
=======
    const botonEliminar =(estado,alias)=>{
>>>>>>> parent of 98ff499 (Merge pull request #22 from EdwinpistonC/revert-21-G390-Listado-usuarios)
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
<<<<<<< HEAD
    const botonRechazar =(estado)=>{
=======
    const botonRechazar =(estado,alias)=>{
>>>>>>> parent of 98ff499 (Merge pull request #22 from EdwinpistonC/revert-21-G390-Listado-usuarios)
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
<<<<<<< HEAD
            {botonAceptar(estado)}
            {botonBloquear(estado)}
            {botonDesloquear(estado)}
            {botonEliminar(estado)}
            {botonRechazar(estado)}
=======
            {botonAceptar(estado,alias)}
            {botonBloquear(estado,alias)}
            {botonDesloquear(estado,alias)}
            {botonEliminar(estado,alias)}
            {botonRechazar(estado,alias)}
>>>>>>> parent of 98ff499 (Merge pull request #22 from EdwinpistonC/revert-21-G390-Listado-usuarios)
        </div>
    );

}