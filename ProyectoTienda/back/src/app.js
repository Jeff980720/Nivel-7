import express from 'express';
import cors from 'cors';
import { companyData } from './companyData.js';
import { productData } from './productData.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/company', (req, res) => {
    console.log('Petición recibida: Obtener emopresa');
    res.json(companyData);
});

app.get('/api/products', (req, res) => {
    console.log('Petición recibida: Obtener productos');
    res.json(productData);
}); 

app.get('/api/health', (req, res) => {
    console.log('Petición recibida: Verificar salud del servidor');
    res.json({
        status: 'OK',
        message: 'Backend funcionando correctamente',
        timestamp: new Date().toISOString(),
        endpoints: [
            'GET /api/company-Obtener datos de compania',
            'GET /api/products-Obtener datos de productos',
            'GET /api/health-Verificar salud del servidor'
        ]
    });
});

app.get('*', (req, res) => {
    console.log('Ruta no encontrada:', req.url);
    res.json({
        message: 'API de facturación',
        description: 'Backend para servir datos de factura al fontend Angular',
        availableEndpoints: [
            'GET /api/company',
            'GET /api/products',
            'GET /api/health'
        ]
    });
});

app.listen(PORT,'0.0.0.0', () => {
    console.log('SERVIDOR BAKEND INICIADO');
    console.log(`URL local: http://localhost:${PORT}`);
});