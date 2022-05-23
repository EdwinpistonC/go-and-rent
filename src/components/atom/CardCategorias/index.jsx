import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const rutaImages = require.context("resources/images/",true);

function CardCategorias({Lugar,Imagen,Ruta}) {
  //const navegar = useNavigate();
  //navegar.call(Ruta)
    return (
      <Link  to={'/give_your_path'}>
        <Card sx={{ maxWidth: 345 }} >
          <CardMedia
            component="img"
            height="140"
            image={rutaImages(`./${Imagen}`)}
            alt="green iguana"
            
          />
          <CardContent >
            <Typography gutterBottom variant="h5" component="div" >
            {Lugar}
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      </Link>

    );
  }


export { CardCategorias };