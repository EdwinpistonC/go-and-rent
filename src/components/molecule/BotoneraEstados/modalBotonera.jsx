import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from "components/atom/Button";
import { CategoriaContenedor,ColumnaGrid } from "./style";
import Api from "server/Api";

const backend = new Api();

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    //border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getBotonStyle(boton) {
  let backcolor=''
  if(boton == "Aceptar"){
    backcolor= "#33b047";
  }else if (boton == "Bloquear"){
    backcolor= "#ecab40";
  }else if (boton == "Desbloquear"){
    backcolor= "#ecab40";
  }else if (boton == "Eliminar"){
    backcolor= "#e53c41";
  }else if (boton == "Rechazar"){
    backcolor= "#e53c41";
  }
  return {
    backgroundColor: `${backcolor}`
    
  };
}


const body = (boton,alias,modalStyle,classes,handleClose,actualizarTabla)=>{

  let div = (<></>);
  if(boton == "Aceptar"){
    div =(<div 
      style={modalStyle}
      className={classes.paper}>
      <h2 id="simple-modal-title">Desea aceptar al {alias}</h2>
      <ColumnaGrid style={{
          textAlign:"center"
        }}
        container spacing={3}>
        <ColumnaGrid item md={3}>
          <Button 
            onClick={handleClose}
          >
          Cancelar
          </Button>
        </ColumnaGrid>
        <ColumnaGrid item md={3}>

          <Button 
            style={getBotonStyle(boton)}
            onClick={(alias) => {
                  backend.aceptarUsuarios(alias).then((response)=>{
                    console.log(response.data);
                    handleClose();
                    actualizarTabla();
                   }).catch((response)=>{
                    alert("Hubo un error intentelo más tarde.");
                    console.error(response.data);
                   });
                }}
          >
          {boton}
          </Button>
        </ColumnaGrid>
      </ColumnaGrid>
    </div>
    );
  }else if (boton == "Bloquear"){

    div =(<div 
      style={modalStyle}
      className={classes.paper}>
      <h2 id="simple-modal-title">Desea Bloquear al {alias}</h2>
      <ColumnaGrid style={{
          textAlign:"center"
        }}
        container spacing={3}>
        <ColumnaGrid item md={3}>
          <Button 
            onClick={handleClose}
          >
          Cancelar
          </Button>
        </ColumnaGrid>
        <ColumnaGrid item md={3}>

          <Button 
            style={getBotonStyle(boton)}
            onClick={() => {

                  backend.bloquearUsuarios(alias).then((response)=>{
                    console.log(response.data);
                    handleClose();
                    actualizarTabla();
                   }).catch((response)=>{
                    alert("Hubo un error intentelo más tarde.");
                    console.error(response.data);
                   });
                }}
          >
          {boton}
          </Button>
        </ColumnaGrid>
      </ColumnaGrid>
    </div>
    );

  }else if (boton == "Desbloquear"){
    div =(<div 
      style={modalStyle}
      className={classes.paper}>
      <h2 id="simple-modal-title">Desea desloquear al {alias}</h2>
      <ColumnaGrid style={{
          textAlign:"center"
        }}
        container spacing={3}>
        <ColumnaGrid item md={3}>
          <Button 
            onClick={handleClose}
          >
          Cancelar
          </Button>
        </ColumnaGrid>
        <ColumnaGrid item md={4}>

          <Button 
            style={getBotonStyle(boton)}
            onClick={(alias) => {
                  backend.desloquearUsuarios(alias).then((response)=>{
                    console.log(response.data);
                    handleClose();
                    actualizarTabla();
                   }).catch((response)=>{
                    alert("Hubo un error intentelo más tarde.");
                    console.error(response.data);
                   });
                }}
          >
          {boton}
          </Button>
        </ColumnaGrid>
      </ColumnaGrid>
    </div>
    );
  }else if (boton == "Eliminar"){
    div =(<div 
      style={modalStyle}
      className={classes.paper}>
      <h2 id="simple-modal-title">Desea eliminar al {alias}</h2>
      <ColumnaGrid style={{
          textAlign:"center"
        }}
        container spacing={3}>
        <ColumnaGrid item md={3}>
          <Button 
            onClick={handleClose}
          >
          Cancelar
          </Button>
        </ColumnaGrid>
        <ColumnaGrid item md={3}>

          <Button 
            style={getBotonStyle(boton)}
            onClick={(alias) => {
                  backend.eliminarUsuarios(alias).then((response)=>{
                    console.log(response.data);
                    handleClose();
                    actualizarTabla();
                   }).catch((response)=>{
                    alert("Hubo un error intentelo más tarde.");
                    console.error(response.data);
                   });
                }}
          >
          {boton}
          </Button>
        </ColumnaGrid>
      </ColumnaGrid>
    </div>
    );
  }else if (boton == "Rechazar"){
    div =(<div 
      style={modalStyle}
      className={classes.paper}>
      <h2 id="simple-modal-title">Desea rechazar al {alias}</h2>
      <ColumnaGrid style={{
          textAlign:"center"
        }}
        container spacing={3}>
        <ColumnaGrid item md={3}>
          <Button 
            onClick={handleClose}
          >
          Cancelar
          </Button>
        </ColumnaGrid>
        <ColumnaGrid item md={3}>

          <Button 
            style={getBotonStyle(boton)}
            onClick={(alias) => {
                  backend.rechazarUsuarios(alias).then((response)=>{
                    console.log(response.data);
                    handleClose();
                    actualizarTabla();
                   }).catch((response)=>{
                    alert("Hubo un error intentelo más tarde.");
                    console.error(response.data);
                   });
                }}
          >
          {boton}
          </Button>
        </ColumnaGrid>
      </ColumnaGrid>
    </div>
    );
  }else{
    div =(<div 
      style={modalStyle}
      className={classes.paper}>
      <h2 id="simple-modal-title"></h2>
      
    </div>
    );
  }
  return div;  
}
export default function SimpleModal({boton, alias,actualizarTabla}) {

  const classes = useStyles();
  //const classes = useStyles();
  //getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  


  return (
    <div>
      <Button 
      onClick={handleOpen}
      style={getBotonStyle(boton)}
      >
        {boton}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body(boton,alias,modalStyle,classes,handleClose,actualizarTabla) }
      </Modal>
    </div>
  );
}