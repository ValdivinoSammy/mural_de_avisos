const firebaseAdmin = require('firebase-admin/auth');

const getAuth = firebaseAdmin.getAuth;

const auth = getAuth();

module.exports = auth;