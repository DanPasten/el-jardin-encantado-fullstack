// server/firebase.js
require('dotenv').config();
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Inicializamos Firebase una sola vez aquí
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Exportamos la base de datos 'db' para usarla en otros archivos
module.exports = { db };