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
    { name: "alias", label: "Alias" },
    {
      name: "email",
      label: "Correo Electronico",
      options: {
        setCellProps: (value) => {
          return {
            style: {
              color: "red",
              width: "230px !important",
              // overflow: 'hidden',
              // whiteSpace: 'nowrap',
              // textOverflow: 'ellipsis'
            },
          };
        },
        setCellHeaderProps: (value) => {
          return {
            style: {
              color: "red",
              width: "230px !important",
              // overflow: 'hidden',
              // whiteSpace: 'nowrap',
              // textOverflow: 'ellipsis'
            },
          };
        },
      },
    },

    { name: "name", label: "Nombre" },
    { name: "lastName", label: "Apellido" },
    { name: "phone", label: "Teléfono" },
    { name: "creationDate", label: "Fecha de alta" },
    { name: "status", label: "Estado" },
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
