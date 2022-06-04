// npm install mui-datatables --save
// https://github.com/gregnb/mui-datatable
// https://www.youtube.com/watch?v=fJRyC-xLIQc referencia
// npm install @material-ui/core --save


import {useState,useEffect} from "react";
import axios from "axios";
import { set } from "date-fns";

import {MUIDataTableStyled} from "./style"

import {definirOpciones} from "./configuracionMUIDatatable"
import { tooltip } from "leaflet";

import {button,
    Link
  } from "react-router-dom";

const ListaUsuarios = ({datos}) => {
    // 1 - configuramos los hooks
    
    // {
    //     usuarios: [
    //       {
    //       "alias": "",
    //       "email": "",
    //       "password": "",
    //       "name": "",
    //       "lastName": "",
    //       "phone": "",
    //       "creationDate": "",
    //       "status": "",
    //       "role": "",
    //       "rating": ""
    //       }, {...}
    //     ]
    //   }
    const[usuarios,setUsuarios]= useState([]);

    // 2 funcion para mostrar datos con axios
    const endponit ="https://fakestoreapi.com/users";
    
    const getData = async () =>{
        await axios.get(endponit).then((response)=>{
          const data = response.data
          //const data = []
          //console.log(data)
          setUsuarios(data)  
        })
    }

    useEffect(()=>{
        setUsuarios(datos) 
        //getData()
    },[])



    // 3 definimos columnas
    const columns =[
        /*{   name:"id",
            label:"ID",
        },
        {
            name:"email",
            label:"Correo Electronico",
        },
        {
            name:"username",
            label:"Usuario",
        },
        {
        name: "Action"
        },*/

        {   name:"alias",
            label:"Alias",
        },
        {   name:"email",
            label:"Correo electrónico",
        },
        
        {   name:"name",
            label:"Nombre",
        },
        {   name:"lastName",
            label:"Apellido",
        },
        {   name:"phone",
            label:"Teléfono",
        },
        {   name:"creationDate",
            label:"Fecha de alta",
        },
        {   name:"status",
            label:"Estado",
        },
        {   name:"role",
            label:"Rol",
        },
        {
            name: "Acciones"
        }
        
    ]
    

    // 4 - mostramos datos
    return(  
                                            
            <MUIDataTableStyled 
                title={"Lista Usuarios"}
                data={usuarios}
                columns={columns}
                options={definirOpciones()}
            />       
  );


}

export { ListaUsuarios};