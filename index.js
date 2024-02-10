/*  Paquetes instalados: -g nodemon, express, express-handlebars, body-parser, mysql2
    Agregado al archivo "package.json" la línea --> "start": "nodemon index"
    
    Proyecto "Node_base"
    Desarrollo de Aplicaciones Informáticas - 5to Informática
    
    Docentes: Nicolás Facón, Martín Rivas
    
    Revisión 1 - Año 2021
*/
//Cargo librerías instaladas y necesarias
const express = require("express"); //Para el manejo del servidor Web
const exphbs = require("express-handlebars"); //Para el manejo de los HTML
const bodyParser = require("body-parser"); //Para el manejo de los strings JSON
const MySQL = require("./modulos/mysql"); //Añado el archivo mysql.js presente en la carpeta módulos

const app = express(); //Inicializo express para el manejo de las peticiones

app.use(express.static("public")); //Expongo al lado cliente la carpeta "public"

app.use(bodyParser.urlencoded({ extended: false })); //Inicializo el parser JSON
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" })); //Inicializo Handlebars. Utilizo como base el layout "Main".
app.set("view engine", "handlebars"); //Inicializo Handlebars

const Listen_Port = 3000; //Puerto por el que estoy ejecutando la página Web

app.listen(Listen_Port, function () {
  console.log(
    "Servidor NodeJS corriendo en http://localhost:" + Listen_Port + "/"
  );
});

/*
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
*/

app.get("/", function (req, res) {
  //Petición GET con URL = "/", lease, página principal.
  console.log(req.query); //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
  res.render("login", null); //Renderizo página "login" sin pasar ningún objeto a Handlebars
});

app.get("/login", function (req, res) {
  //Petición GET con URL = "/login"
  console.log("Soy un pedido GET", req.query);
  //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
  res.render("home", null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.post("/login", function (req, res) {
  //Petición POST con URL = "/login"
  console.log("Soy un pedido POST", req.body);
  //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método POST
  //res.render('home', { mensaje: "Hola mundo!", usuario: req.body.usuario}); //Renderizo página "home" enviando un objeto de 2 parámetros a Handlebars
  res.render("home", null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.put("/login", function (req, res) {
  //Petición PUT con URL = "/login"
  console.log("Soy un pedido PUT", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método PUT
  res.send(null);
});

app.delete("/login", function (req, res) {
  //Petición DELETE con URL = "/login"
  console.log("Soy un pedido DELETE", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método DELETE
  res.send(null);
});

/* GET Del formulario */

app.get("/producto", function (req, res) {
  return res.render("form", null);
});

/* 
Realizar una primera página con un formulario que sirva para subir nuevos productos en la
tabla Productos. Deberá verificar previamente que el dato que va a agregar no estuviera
ya en la tabla. Al enviarse el formulario, se deberá redirigir a la página realizada en el
punto 2.
*/
app.post("/producto", async function (req, res) {
  const { cantidad, producto, categoria } = req.body;

  //Primero verifico que el producto no exista en la base de datos  
  const productos = await MySQL.realizarQuery(`SELECT * FROM Productos WHERE  Producto = "${producto}" ` )
  if (productos.length > 0) {
    console.log("El producto ya existe");
    //res.send({validar:true})
  }
  else{
    // Inserto el producto
    const insert = await MySQL.realizarQuery(
      `INSERT INTO Productos (Cantidad, Producto, Categoria) VALUES ("${3}", "${producto}", "${categoria}")`
    );
    const productos = await MySQL.realizarQuery("SELECT * FROM Productos");
    res.render("productos", {prod: productos} ); //Renderizo página "home" sin pasar ningún objeto a Handlebars
  }
 
});

app.get("/productosCargados", async function(req,res){
  const productos = await MySQL.realizarQuery("SELECT * FROM Productos");
  res.render("productos", {prod: productos} ); //Renderizo página "home" sin pasar ningún objeto a Handlebars
})

app.delete("/producto/:producto", async function(req, res){
  const {producto} = req.params
  
  await MySQL.realizarQuery(`DELETE FROM productos WHERE productos.producto = "${producto}"`)
  
  const productos = await MySQL.realizarQuery("SELECT * FROM Productos");
  res.redirect("productosCargados"); //Renderizo página "home" sin pasar ningún objeto a Handlebars
})


app.put("/producto", async function(req, res){
  const {producto, nuevoProducto} = req.body
  const response = await MySQL.realizarQuery(`UPDATE productos SET producto="${nuevoProducto}" WHERE producto="${producto}"`)
  console.log(response)
})