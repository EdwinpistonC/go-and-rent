// Documentación de columnas
// https://github.com/gregnb/mui-datatables/#custom-components 


// here I set the them

import {Button} from "components/atom/Button"


function definirOpciones(){
    //const action = <button onClick={alert("hola")}> boton</button>;

    const botones = (estado)=>{
        return(
            <div >
                
                <Button
                    // onClick={() => {
                    // onSecundario2();
                    // cerrarModal();
                    // }}v
                    width={"30px"}
                >
                Eliminar
                </Button>
                <Button
                    // onClick={() => {
                    // onSecundario2();
                    // cerrarModal();
                    // }}
                    width={"30px"}
                >
                Bloquear
                </Button>
                <Button
                    // onClick={() => {
                    // onSecundario2();
                    // cerrarModal();
                    // }}
                    width={"30px"}
                >
                {estado}
                </Button>
            </div>
        );
    }
    const opciones =  {
        //customAction: action,
        download:false, // boton para generar csv
        print:false,    // boton para generar pdf
        //display:false,
        viewColumns:false, // Boton para ocultar columnas
        //searchable:false,
        filter: true, // habilita el boton de filtro
        textLabels: {
            body: {
                noMatch: "Lo sentimos, no se han encontrado resultados.",
                toolTip: "Sort",
                columnHeaderTooltip: column => `Sort for ${column.label}`
            },
            pagination: {
                next: "Siguiente pagina",
                previous: "Anterior pagina",
                rowsPerPage: "Filas por pagina:",
                displayRows: "of",
            }
        },
        setRowProps: (row, dataIndex, rowIndex) => {

            row[row.length -1 ] = botones(row[row.length -2 ]);


        },
    };
    return opciones;
}





export  {definirOpciones}
