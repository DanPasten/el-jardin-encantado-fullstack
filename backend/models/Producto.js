// server/models/Producto.js
const mongoose = require('mongoose');

// Definimos la estructura de nuestros productos
const productoSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true 
    },
    precio: { 
        type: Number, 
        required: true 
    },
    imagen: { 
        type: String, 
        required: true 
    },
    descripcion: { 
        type: String, 
        default: "Hermosa flor fresca." 
    },
    categoria: { 
        type: String, 
        required: true 
    }
});

// Creamos el modelo y lo exportamos
module.exports = mongoose.model('Producto', productoSchema);