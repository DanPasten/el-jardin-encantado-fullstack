// server/routes/productos.js
const { Router } = require('express');
const { db } = require('../firebase'); 

const router = Router();

// 1. OBTENER todos los productos
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection('productos').get();
        const productos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. CREAR un producto nuevo 
router.post('/', async (req, res) => {
    try {
        // req.body contiene los datos que envía el Frontend 
        const nuevoProducto = {
            nombre: req.body.nombre,
            precio: Number(req.body.precio),
            imagen: req.body.imagen,
            categoria: req.body.categoria,
            descripcion: req.body.descripcion || "Descripción pendiente."
        };

        // Guardamos en Firebase 
        const docRef = await db.collection('productos').add(nuevoProducto);
        
        // Respondemos con el ID creado y los datos
        res.status(201).json({ id: docRef.id, ...nuevoProducto });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. ELIMINAR un producto
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection('productos').doc(id).delete();
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;