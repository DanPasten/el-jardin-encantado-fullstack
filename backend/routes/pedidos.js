// server/routes/pedidos.js
const { Router } = require('express');
const { db } = require('../firebase');

const router = Router();

// 1. OBTENER todos los pedidos
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection('pedidos').orderBy('fecha', 'desc').get();
        const pedidos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. CREAR un nuevo pedido 
router.post('/', async (req, res) => {
    try {
        const nuevoPedido = {
            fecha: new Date().toLocaleString(), // Guardamos la fecha del servidor
            cliente: req.body.cliente,
            productos: req.body.productos,
            total: req.body.total,
            estado: 'pendiente'
        };

        const docRef = await db.collection('pedidos').add(nuevoPedido);
        res.status(201).json({ id: docRef.id, ...nuevoPedido });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. ELIMINAR/COMPLETAR pedido 
router.delete('/:id', async (req, res) => {
    try {
        await db.collection('pedidos').doc(req.params.id).delete();
        res.json({ message: 'Pedido eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;