import React from "react"
import "./cards.css"
import FormDialog from "./dialog/dialog"

export default function Card(props) {

    const [open, setOpen] = React.useState(false);

    return( 
    <>    
    <FormDialog 
    open={open} 
    setOpen={setOpen} 
    name={props.name} 
    telefone={props.telefone}
    listCard={props.listCard}
    setListCard={props.setListCard}
    id={props.id}/> 
    <div className="card--container" onClick={() => setOpen(true)}> 
        <p className="card--name"> Nome: {props.name}</p>
        <p className="card--telefone">Telefone: {props.telefone}</p>
    </div>
    </>
    );
}