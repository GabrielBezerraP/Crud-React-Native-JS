const express = require("express");
const app = express();
const mysql = require("mysql")
const cors = require("cors")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Password@123",
    database: "lessensesql",
    insecureAuth : true
})

app.use(cors());
app.use(express.json());



app.get("/getCards", (req, res) => {
    let SQL = 'select * from usuario';
    
    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
})

app.listen(3001, ()=> {
    console.log("iniciando serviço");
})

app.put ("/edit", (req, res) => {
    const { id } = req.body;
    const { name } = req.body;
    const { telefone } = req.body;
    
    let SQL = 'update usuario set user_name = ?, user_telefone = ? WHERE idusuario = ?';

    db.query(SQL, [name, telefone, id ], (err, result) => {
        console.log(result)
    })
})

app.delete("/delete/:id", (req, res) => {
    const {id} = req.params;
    let SQL = "DELETE FROM usuario WHERE idusuario = ?";
    db.query(SQL, [id] , (err, result) => {
        console.log(result);
        console.log(err);
    })
})


app.post("/register", (req, res) => {
    const { name } = req.body;
    const { telefone } = req.body;

    let SQL = "INSERT INTO usuario ( user_name , user_telefone ) values (?, ? )"

    db.query(SQL, [name, telefone],  (err, result) => {
        console.log(err)
    })
})