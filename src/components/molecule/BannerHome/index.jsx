import React from 'react';

//Style
import { LoginBase, LayoutTextField, LayoutOptions } from "./style";

//react component
import { Button } from "components/atom/Button";
import { ForkLeft } from '@mui/icons-material';

const rutaImages = require.context("resources/images/",true);


export default function BannerHome({tituloBanner,imagenBanner}){

    return(
        <div 
          style={{
            borderRadius:"15px",
            margin:"10px",
            maxWidth:"1228px",
            minHeight:"500px",
            maxHeight:"719px",
            backgroundImage: `url('${rutaImages("./"+imagenBanner)}')`,
            textAlign:"center", 
            backgroundPosition: "center",
            backgroundAttachment: "cover",
            backgroundSize: "cover",
            position: "relative",
          }}>
            <h2
            style={{
                
                position: "absolute",
                bottom: "90px",
                color:"#fff",
                textAlign:"center",
                left:"30vw"
                
              }}
            >{tituloBanner}</h2>
            <Button
            style={{
                
                width:"150px",
                height:"50px",
                position: "absolute",
                bottom: "50px",
                left:"45vw"
                
              }}
            >Exploarar</Button>
        </div>
    );
}

