const firebaseAdmin = require('firebase-admin/app');

const initializeApp = firebaseAdmin.initializeApp;
const cert = firebaseAdmin.cert; 

const serviceAccount = require("../mural-75435-firebase-adminsdk-fbsvc-4b62123f76.json");

const app = initializeApp({
    credential: cert(serviceAccount)
});

const getFirestore = require('firebase-admin/firestore').getFirestore;

const db = getFirestore(app);

module.exports = db;