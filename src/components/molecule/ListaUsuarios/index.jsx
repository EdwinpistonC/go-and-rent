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
<<<<<<< HEAD
            label:"Correo Electronico",
            options: {
                setCellProps: value => {
                    return {
                        style: {
                            color:'red',
                            width: '230px !important',
                            // overflow: 'hidden',
                            // whiteSpace: 'nowrap',
                            // textOverflow: 'ellipsis'
                        },
                    };
                },
                setCellHeaderProps: value => {
                    return{
                        style: {
                            color:'red',
                            width: '230px !important',
                            // overflow: 'hidden',
                            // whiteSpace: 'nowrap',
                            // textOverflow: 'ellipsis'
                        },
                    }
                }
            }
=======
            label:"Correo electrónico",
>>>>>>> parent of 98ff499 (Merge pull request #22 from EdwinpistonC/revert-21-G390-Listado-usuarios)
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
<<<<<<< HEAD
            name: "Action"
=======
            name: "Acciones"
>>>>>>> parent of 98ff499 (Merge pull request #22 from EdwinpistonC/revert-21-G390-Listado-usuarios)
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