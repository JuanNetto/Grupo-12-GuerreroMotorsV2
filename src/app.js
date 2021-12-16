const express = require ("express");
const routers = require ("./routers/routers");
const app = express();
app.use(express.static('../public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded ( { extended: false } ) );
app.use(express.json());




app.listen(3000, ()=>{
    console.log('server running');
});

app.use(routers);