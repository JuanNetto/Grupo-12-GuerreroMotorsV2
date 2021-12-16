const express = require("express");
const app = express();
app.set('view engine', 'ejs');
const fs = require("fs");


const controlador = {
    'home': (req, res) => {
        res.render('home.ejs');
    },

    'list': (req, res) => {
        let productos = fs.readFileSync('./database/productos.json');
        let productosJSON = JSON.parse(productos);
        res.render('list.ejs',{productosJSON});
    },

    'login': (req, res) => {
        res.render('login.ejs');
    },

    'loginPost': (req, res) => {
        let usuarios = fs.readFileSync('./database/users-data.json', 'utf-8');
        let usuariosJSON = JSON.parse(usuarios);
        let userEmail = req.body.email;
        let userContra = req.body.contraseña;
        let valido = false;
        usuariosJSON.forEach(usuario=>{
            if (usuario.email == userEmail && usuario.contraseña == userContra){            
                console.log("todo bien bro");
                valido = true;                         
            }
        })
        if (valido){
            res.redirect("/");
        }
        else{
            res.render('login.ejs', {mensaje : "datos incorrectos"});
        }
    }, 

    'signup': (req, res) =>{
        res.render('signup.ejs');
    },

    'signupPost': (req, res) => {
        let usuarios = fs.readFileSync('./database/users-data.json', 'utf-8');
        let usuariosJSON = JSON.parse(usuarios);
        usuariosJSON.push(req.body);
        let enviar = JSON.stringify(usuariosJSON);
        fs.writeFileSync('./database/users-data.json', enviar);
        res.redirect("/");
        console.log("cree el usuario, negro");
    },

    'editar': (req, res) => {
        let productos = fs.readFileSync('./database/productos.json');
        let productosJSON = JSON.parse(productos);
        res.render('editar.ejs',{productosJSON});
    },

    'editarAuto': (req, res) => {
        let productos = fs.readFileSync('./database/productos.json');
        let productosJSON = JSON.parse(productos);
        let auto;
        for (i=0; i< productosJSON.length; i++){
            if (productosJSON[i].id==req.params.id){
                auto = productosJSON[i];
            }
        }
        res.render('editarAuto.ejs',{auto});
    },

    'editarPost': (req, res) => {
        console.log('llegue');
        let productos = fs.readFileSync('./database/productos.json');
        let productosJSON = JSON.parse(productos);
        var autoId = req.body.id;
        for (let i=0; i< productosJSON.length; i++){
            if (productosJSON[i].id==autoId){
                productosJSON[i] = req.body;
            }
        }
        let archivo = JSON.stringify(productosJSON);
        fs.writeFileSync('./database/productos.json', archivo);
        res.redirect("/");
    },
    
    'agregar': (req, res) => {
        res.render('agregar.ejs');
    },

    'agregarPost': (req, res) => {
        let productos = fs.readFileSync('./database/productos.json');
        let productosJSON = JSON.parse(productos);
        productosJSON.push(req.body);
        var listaFinal = JSON.stringify(productosJSON);
        fs.writeFileSync('./database/productos.json',listaFinal);
        res.redirect('/');
    }
}


module.exports = controlador;