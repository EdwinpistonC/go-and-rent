// Documentación de columnas
// https://github.com/gregnb/mui-datatables/#custom-components 


// here I set the them


function definirOpciones(){
    const opciones =  {
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
        }
    };
    return opciones;
}





export  {definirOpciones}
