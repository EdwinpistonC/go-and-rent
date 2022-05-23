import React from 'react';

//Style
import { LoginBase, LayoutTextField, LayoutOptions } from "./style";

//react component
import { Button } from "components/atom/Button";
function BannerHome({tituloBanner,imagenBanner}){
    return(
        <div>
            <h2>{tituloBanner}</h2>
            <Button>Exploarar</Button>
        </div>
    );
}