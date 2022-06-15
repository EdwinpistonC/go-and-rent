// Documentación de columnas
// https://github.com/gregnb/mui-datatables/#custom-components

// here I set the them

import botoneraEstados from "components/molecule/BotoneraEstados";
import { iconoEstados } from "components/atom/Icon";

function definirOpciones() {
  //const action = <button onClick={alert("hola")}> boton</button>;
  // const roles = {
  //   ROLE_GUEST: "HUÉSPED",
  //   ROLE_ADMIN: "ADMINISTRADOR",
  //   ROLE_HOST: "ANFITRIÓN",
  // };

  // const emails = (email) => {
  //   return (
  //     <div
  //       style={{
  //         width: "10em",
  //         overflow: "hidden",
  //         whiteSpace: "nowrap",
  //         textOverflow: "ellipsis",
  //       }}
  //     >
  //       {email}
  //     </div>
  //   );
  // };

  const opciones = {
    //customAction: action,
    selectableRows: "none",
    download: false, // boton para generar csv
    print: false, // boton para generar pdf
    //display:false,
    viewColumns: false, // Boton para ocultar columnas
    //searchable:false,
    filter: true, // habilita el boton de filtro
    textLabels: {
      body: {
        noMatch: "Lo sentimos, no se han encontrado resultados.",
        toolTip: "Sort",
        columnHeaderTooltip: (column) => `Sort for ${column.label}`,
      },
      pagination: {
        next: "Siguiente pagina",
        previous: "Anterior pagina",
        rowsPerPage: "Filas por pagina:",
        displayRows: "of",
      },
    },
    setRowProps: (row, dataIndex, rowIndex) => {
      // let estado = row[row.length - 3];
      // let alias = row[0];
      // let rol = row[row.length - 2];
      // row[row.length - 1] = botoneraEstados(estado,alias);
      // row[row.length - 2] = roles[rol];
      // row[row.length - 3] = iconoEstados(estado);
      // row[1] = emails(row[1]);
    },
  };
  return opciones;
}

export { definirOpciones };
