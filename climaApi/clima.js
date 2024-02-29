const express = require('express');
const cors = require("cors");
const axios = require('axios');
const app = express();
app.use(cors());

const API_KEY = "e424cb555a18a91f0d5a86021f8f9fa7";
app.use(express.static(__dirname +"/public"))

app.get("/clima/actual", async (req, res) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&q=Quito,Ecuador&lang=es&units=metric`;
    const response = await axios.get(url);
    const data = response.data;
    const estado = data.weather;
    const temperatura = data.main.temp;
    const humedad = data.main.humidity;
    res.json({ estado, temperatura, humedad });
  } catch (error) {
    res.status(400).sendFile(__dirname +"/public/404.html");
  }
});

// Maneja las páginas 404
app.use((req, res) => {
  res.status(404).sendFile(__dirname +"/public/404.html");
});

app.listen(5001, () => {
  console.log("Servidor corriendo en el puerto 5001...");
});