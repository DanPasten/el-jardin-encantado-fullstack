require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importamos las rutas
const productosRoutes = require('./routes/productos');
const pedidosRoutes = require('./routes/pedidos'); // <--- NUEVA LÍNEA

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('🌸 API del Jardín Encantado Online 🌸');
});

// Conectamos las rutas
app.use('/api/productos', productosRoutes);
app.use('/api/pedidos', pedidosRoutes); // <--- NUEVA LÍNEA

app.listen(PORT, () => {
    console.log(`🚀 Servidor API corriendo en http://localhost:${PORT}`);
});