import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import produce from "immer";

export default function FormDialog(props) {

    const [editValues, setEditValues] = useState({
        id: props.id,
        name: props.name,
        telefone: props.telefone
    });

    const handleEditUsuario = () => {
      
        Axios.put("http://localhost:3001/edit", {
            id: editValues.id,
            name: editValues.name,
            telefone: editValues.telefone
          });
          handleClose();
    }

    const handleChangeValues = value =>{
        setEditValues(prevValues => () => ({
            ...prevValues,
            [value.taget.id]: value.target
        })
        )
    };

    const handleOpen = () => {
        props.setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false)
        
      };

    const handleDeleteUsuario = () => {
      Axios.delete(`http://localhost:3001/delete/${editValues.id}`).then(() => {
        props.setListCard(
          props.listCard.filter((value) => {
            return value.id != editValues.id;
          })
        );
      });
      handleClose(); 
    };

  return (
    <div>
      <Dialog
      
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome do usuário"
            defaultValue={props.name}
            type="text"
            onChange={handleChangeValues}
            fullWidth
            id={props.id}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Telefone"
            defaultValue={props.telefone}
            type="text"
            onChange={handleChangeValues}
            fullWidth
            id={props.id}
          />
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteUsuario} color="primary">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}