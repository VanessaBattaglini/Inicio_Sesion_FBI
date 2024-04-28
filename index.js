import express from 'express';
process.loadEnvFile();
const app = express();
const PORT = process.env.PORT || 3000;

import router from './routes/router.js';

import path from 'path';
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

//Middelwares rutas
app.use('/', router);


//Middleware carpeta pública
app.use(express.static(path.join('assets')));




app.listen(PORT, () => {
console.log(`El servidor se ha levantado en el PORT http://localhost:${PORT}`)
});



