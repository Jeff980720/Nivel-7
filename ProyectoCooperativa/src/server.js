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

// import express from 'express';
// import cors from 'cors';
// // Importamos el nuevo servicio con la lógica de negocio
// import { getAllSocios } from './socio.service.js';
// import { coperativaData } from './coperativadata.js';
// // coperativaData ya no se usa directamente en el endpoint, pero se usa en el servicio.

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());

// // *** RUTA MODIFICADA: Ahora usa el servicio asíncrono ***
// app.get('/api/socios', async (req, res) => {
//     console.log('Petición recibida: Obtener socios filtrados y mapeados');
//     try {
//         // Llamamos a la función del servicio y esperamos su resultado (la promesa)
//         res.json(coperativaData);
//         const sociosFiltrados = await getAllSocios();
//         res.json(sociosFiltrados); // Enviamos solo los socios válidos y transformados
//     } catch (error) {
//         console.error('Error al procesar la petición de socios:', error);
//         res.status(500).json({ error: 'Fallo interno del servidor al procesar los datos de socios.' });
//     }
// });

// app.get('/api/health', (req, res) => {
//     console.log('Petición recibida: Verificar salud del servidor');
//     res.json({
//         status: 'OK',
//         message: 'Backend funcionando correctamente',
//         timestamp: new Date().toISOString(),
//         endpoints: [
//             'GET /api/socios - Obtener datos de socios (filtrados)',
//             'GET /api/health - Verificar salud del servidor'
//         ]
//     });
// });

// app.get('*', (req, res) => {
//     console.log('Ruta no encontrada:', req.url);
//     res.status(404).json({
//         message: 'API de cooperativa de socios',
//         description: 'Backend para servir datos de cooperativa al fontend Angular',
//         availableEndpoints: [
//             'GET /api/socios',
//             'GET /api/health'
//         ]
//     });
// });

// app.listen(PORT, '0.0.0.0', () => {
//     console.log('SERVIDOR BAKEND INICIADO');
//     console.log(`URL local: http://localhost:${PORT}`);
// });