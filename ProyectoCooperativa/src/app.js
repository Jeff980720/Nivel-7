import express from 'express';
import cors from 'cors';
import { coperativaData } from './coperativadata.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/socios', (req, res) => {
    console.log('Petición recibida: Obtener socios');
    res.json(coperativaData);
});

app.get('/api/health', (req, res) => {
    console.log('Petición recibida: Verificar salud del servidor');
    res.json({
        status: 'OK',
        message: 'Backend funcionando correctamente',
        timestamp: new Date().toISOString(),
        endpoints: [
            'GET /api/socios-Obtener datos de socios',
            'GET /api/health-Verificar salud del servidor'
        ]
    });
});

app.get('*', (req, res) => {
    console.log('Ruta no encontrada:', req.url);
    res.json({
        message: 'API de cooperativa de socios',
        description: 'Backend para servir datos de cooperativa al fontend Angular',
        availableEndpoints: [
            'GET /api/socios',
            'GET /api/health'
        ]
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log('SERVIDOR BAKEND INICIADO');
    console.log(`URL local: http://localhost:${PORT}`);
});