const express = require('express');
const cors = require("cors");
const axios = require('axios');
const app = express();
app.use(cors());

// URL de las APIs de los microservicios
const BOMBA_API_URL = "http://bomba:5000";
const CLIMA_API_URL = "http://clima:5001";
const HUMEDAD_SUELO_API_URL = "http://humedadsuelo:5002";

app.use(express.static(__dirname +"/public"))

app.get("/estado", async (req, res) => {
  try {
    // Obtiene el estado de la bomba
    const bomba_estado = await axios.get(`${BOMBA_API_URL}/bomba/estado`);

    // Obtiene el clima actual
    const clima_actual = await axios.get(`${CLIMA_API_URL}/clima/actual`);

    // Obtiene la humedad del suelo en la zona 1
    const humedad_suelo = await axios.get(`${HUMEDAD_SUELO_API_URL}/humedad/suelo/zona1`);
    const humedad_suelo2 = await axios.get(`${HUMEDAD_SUELO_API_URL}/humedad/suelo/zona2`);
    const humedad_suelo3 = await axios.get(`${HUMEDAD_SUELO_API_URL}/humedad/suelo/zona3`);
    // Integra los datos
    const estado = {
      bomba: bomba_estado.data,
      clima: clima_actual.data,
      humedad_suelo: humedad_suelo.data,
      humedad_suelo2: humedad_suelo2.data,
      humedad_suelo3: humedad_suelo3.data
    };

    res.json(estado);
  } catch (error) {
    app.use((req,res) =>{
      res.status(400).sendFile(__dirname +"/public/404.html")
    })  
    
  }
});

app.get("/encender", async (req, res) => {
  try {
    // Enciende la bomba
    const response = await axios.get(`${BOMBA_API_URL}/bomba/encender`);
    res.json(response.data);
  } catch (error) {
    res.status(400).sendFile(__dirname +"/public/404.html");
  }
});

app.get("/apagar", async (req, res) => {
  try {
    // Apaga la bomba
    const response = await axios.get(`${BOMBA_API_URL}/bomba/apagar`);
    res.json(response.data);
  } catch (error) {
    res.status(400).sendFile(__dirname +"/public/404.html");
  }
});

app.use((req, res) => {
  res.status(404).sendFile(__dirname +"/public/404.html");
});


app.listen(3001, () => {
  console.log("Servidor corriendo en el puerto 3001...");
});
