import { CategoriaContenedor } from "./style";
import Grid from '@mui/material/Grid';

import {CardCategorias} from "components/atom/CardCategorias";


function CategoriaBox(){
    return(
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <CardCategorias Lugar ='Montevideo' Imagen ='montevideo.jpg' Ruta='montevideo' />
            </Grid>
            <Grid item xs={3}>
                <CardCategorias Lugar ='Piriapolis' Imagen ='piriapolis.webp' Ruta='montevideo' />
            </Grid>
            <Grid item xs={3}>
                <CardCategorias Lugar ='Punta del diablo' Imagen ='puntadeldiablo.jpg' Ruta='montevideo' />
            </Grid>
            <Grid item xs={3}>
                <CardCategorias Lugar ='Punta del este' Imagen ='puntadeleste.jpg' Ruta='montevideo' />
            </Grid>
        </Grid>

    );
}

export default CategoriaBox;



