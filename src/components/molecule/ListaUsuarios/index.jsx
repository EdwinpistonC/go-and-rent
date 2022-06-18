// npm install mui-datatables --save
// https://github.com/gregnb/mui-datatable
// https://www.youtube.com/watch?v=fJRyC-xLIQc referencia
// npm install @material-ui/core --save

import { useState, useEffect } from "react";
import axios from "axios";
import { set } from "date-fns";

import { MUIDataTableStyled } from "./style";

import { definirOpciones } from "./configuracionMUIDatatable";
import { tooltip } from "leaflet";

import { button, Link } from "react-router-dom";

const ListaUsuarios = ({ datos }) => {
  //  definimos columnas
  const columns = [
    { name: "alias", label: "Alias",
    options: {
      filter: false,}
    },
    {
      name: "email",
      label: "Correo Electronico",
      options: {
        filter: false
      }

    },

    { name: "name", label: "Nombre" },
    { name: "lastName", label: "Apellido" },
    { name: "phone", label: "Teléfono" ,
      options: {
        filter: true,
        filterOptions: {
          renderValue: v => v ? v.replace(/^[9]{8,8}$/, 'hola') : ''
        },
        //display: 'excluded',
        filterType: 'dropdown'
      },
    },
    { name: "creationDate", label: "Fecha de alta" },
    { name: "status", label: "Estado",
      options: {
        filter: false,
        customFilterListOptions: {
          render: v =>{
            console.log(v);
            return v.toLowerCase()
          } 
        },
      },
    },
    { name: "role", label: "Rol" },
    {
      name: "Action",
    },
  ];

  //  mostramos datos
  return (
    <MUIDataTableStyled
      title={"Lista Usuarios"}
      data={datos}
      columns={columns}
      options={definirOpciones()}
    />
  );
};

export { ListaUsuarios };
