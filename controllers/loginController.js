import jwt from 'jsonwebtoken';
import {agentes} from '../data/agentes.js';
import router from '../routes/router.js'

process.loadEnvFile();
const keySecret = process.env.SECRET;

import path from "path";
const __dirname = import.meta.dirname;

//Ruta raíz
export const home = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
};

//Inicio de sesión
export const getLogin = (req, res) => {
    try {
        const { email, password } = req.query;
        const agent = agentes.find(
            (a) => a.email === email && a.password === password
        );
        if (!agent) {
            return res.status(401).json({
                error: '401 Unauthorized',
                message: 'Agente y/o contraseña incorrectos.',
            });
        };

        let token = jwt.sign({ email }, keySecret, { expiresIn: '2m' });
        agentes
            ? res.send(`
            <center><h1><p> Agente autenticado, bienvenido <b>${email}</b>
            Su token está en el sessionStorage </p>
            <a href="/dashboard?token=${token}"> 
            Ir a Dashboard</a></h1></center>
            <script>
                sessionStorage.setItem('token, JSON.stringify("${token}"))
            </script>
            `)
            : res.send("Agente o contraseña incorrecta");
        } catch (error) {
        console.log(error.message)
    }
};
//Crear el dashboard
export const getDashboard = (req, res) => {
    try {
        const { token } = req.query;
        jwt.verify(token, keySecret, (err, data) => {
            if (err) {
                res.status(401)
                    .send(`¡ALERTAR! Agente no esta autorizado ${err.message}`);
            }
            else res.send(
                `<center><h1>¡Bienvenido al Dashboard ${data.email}</h1></center>`
            );
        })
        res.send(`¡Bienvenido Agente ${email}`);
    } catch (error) {
        console.log(error.message)
    }
};
