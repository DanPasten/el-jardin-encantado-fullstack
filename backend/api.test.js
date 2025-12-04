const request = require('supertest');
const express = require('express');
const cors = require('cors');
// Importamos solo las rutas,
const productosRoutes = require('./routes/productos');

// Configuramos una app de Express para la prueba
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/productos', productosRoutes);

describe('Pruebas de la API de Productos', () => {

    test('GET /api/productos debería responder con un array y status 200', async () => {
        // 1. Hacemos una petición GET falsa
        const respuesta = await request(app).get('/api/productos');

        // 2. Verificamos que el código sea 200 (OK)
        expect(respuesta.statusCode).toBe(200);

        // 3. Verificamos que lo que devuelve sea un Array (lista de productos)
        expect(Array.isArray(respuesta.body)).toBe(true);
        
        // 4. Verificamos que el contenido sea JSON
        expect(respuesta.headers['content-type']).toMatch(/json/);
    });

});