const express = require('express');
const cors = require("cors");
const app = express();
app.use(cors());
const puerto = 5000;
// Simula el estado de la bomba
app.use(express.static(__dirname +"/public"))
let bomba_encendida = false;

app.get("/bomba/estado", (req, res) => {
  res.json({ encendida: bomba_encendida });
});

app.get("/bomba/encender", (req, res) => {
  console.log("Encendiendo bomba...");
  bomba_encendida = true;
  res.json({ success: true, bomba_encendida });
});

app.get("/bomba/apagar", (req, res) => {
  console.log("Apagando bomba...");
  bomba_encendida = false;
  res.json({ success: true, bomba_encendida });
});

app.use((req,res) =>{
  res.status(400).sendFile(__dirname +"/public/404.html")
})

app.listen(puerto, () => {
  console.log("Servidor corriendo en el puerto 5000...");
});
