const express = require('express');
const cors = require("cors");
const app = express();
app.use(cors());

// Simula la humedad del suelo en diferentes zonas
const humedad_suelo = {
  "zona1": Math.random()*100,
  "zona2": Math.random()*100,
  "zona3": Math.random()*100
};

app.get("/humedad/suelo/:zona", (req, res) => {
  const zona = req.params.zona;
  
  if (!(zona in humedad_suelo)) {
    res.status(404).sendFile(__dirname +"/public/404.html");
  } else {
    res.json({ humedad: humedad_suelo[zona] });
  }
});

// Maneja las páginas 404
app.use((req, res) => {
  res.status(404).sendFile(__dirname +"/public/404.html");
});

app.listen(5002, () => {
  console.log("Servidor corriendo en el puerto 5002...");
});