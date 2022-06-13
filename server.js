const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const dotenv = require('dotenv').config();
const cors = require('cors');


// Importamos coneccion a mongoDb
const connectionDB = require('./database/database-config')


// Inicializar coneccion
const conn = connectionDB();

// Inicializar express
const app = express();

// inicializar middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(cors())


// creamos port 
const port = process.env.PORT || 5000

// Inicializamos el puerto
app.listen(port, ()=> {
    console.log("App listen in port: ", port)
})

//url por defecto
app.get('/', (req, res) => {

    console.log("App using default url");
    res.status(200).send("API woking it"); 
});

// Importamos rutas de modelos
const usuarioRouter = require('./routers/usuario-router')
const tipoEquipoRouter = require('./routers/tipoEquipo-router');
const estadoEquipoRouter = require('./routers/estadoEquipo-router');
const marcaRouter = require('./routers/marca-router');
const inventarioRouter = require('./routers/inventario-router');

// Usamos rutas de los modelos
app.use('/api', usuarioRouter);
app.use('/api', tipoEquipoRouter);
app.use('/api', estadoEquipoRouter);
app.use('/api', marcaRouter);
app.use('/api', inventarioRouter);