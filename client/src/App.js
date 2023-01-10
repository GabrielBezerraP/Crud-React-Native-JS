import React, {useState, useEffect} from 'react'
import './App.css';
import Axios  from 'axios';
import Card from './components/cards/cards'
import axios from 'axios';
import { Button } from '@material-ui/core';


function App() {
  const [values, setValues] = useState();
  const [ listUsuario, setListUsuario] = useState();
  const handleChangeValues = (value) =>{
    setValues(prevValue=> ({
        ...prevValue,
        [value.target.name]: value.target.value,

    }))
  }
  
  const handleCLickButton = () =>{
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      telefone: values.telefone
    }).then((response) => {
      console.log(response)
    });
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListUsuario(response.data)
    })
  })

  return (
    <div className="app--container">
      <div className="register--container">
        <h1 className="register--title"> Cadastro de cliente</h1>
        <input type='text' name='name'
        placeholder='Nome'
        className='register--input'
        onChange={handleChangeValues}        
        />
        <input type='text' name='telefone'
        placeholder='Telefone'
        className='register--input'
        onChange={handleChangeValues} 
        />
        <button className='register--button' onClick={() => handleCLickButton()}>Cadastrar</button>
      </div>   
      {typeof listUsuario !== 'undefined' && listUsuario.map((value)=> {
        return <Card key={value.id}
        listCard={listUsuario}
        setListCard={setListUsuario}
        id={value.idusuario}
        name={value.user_name}
        telefone={value.user_telefone}
        ></Card>;
      })}
        
    </div>
    
  );
}

export default App;
