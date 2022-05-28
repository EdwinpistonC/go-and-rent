// npm install mui-datatables --save
// https://github.com/gregnb/mui-datatable
// https://www.youtube.com/watch?v=fJRyC-xLIQc referencia
import MUIDataTable from "mui-datatables";



import {useState,useEffect} from "react";
import axios from "axios";
import { set } from "date-fns";

import {definirOpciones,getMuiTheme} from "./configuracionMUIDatatable"

const ListaUsuarios = () => {
    // 1 - configuramos los hooks

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
        getData()
    },[])

    // 3 definimos columnas
    const columns =[
        {   name:"id",
            label:"ID",
        },
        {
            name:"email",
            label:"Correo Electronico",
        },
        {
            name:"username",
            label:"Usuario"
        }
    ]
    

    // 4 - mostramos datos
    return(
  
            <MUIDataTable 
                title={"Lista Usuarios"}
                data={usuarios}
                columns={columns}
                options={definirOpciones()}
            />

  );


}

export { ListaUsuarios};