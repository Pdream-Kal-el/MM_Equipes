const express = require('express');
const TimeController = require('../controllers/timesController'); // Importe seu controlador aqui

const router = express.Router();

// Definindo as rotas
router.post('/Times', TimeController.adicionarTime);
router.get('/Times', TimeController.buscarTime);
router.put('/Times/:id', TimeController.atualizarTime);
router.delete('/Times/:id', TimeController.removerTime);

module.exports = router;
