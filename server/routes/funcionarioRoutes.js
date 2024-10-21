const express = require('express');
const FuncionarioController = require('../controllers/funcionarioController'); // Importe seu controlador aqui

const router = express.Router();

// Definindo as rotas
router.post('/funcionarios', FuncionarioController.adicionarFuncionario);
router.get('/funcionarios', FuncionarioController.buscarFuncionario);
router.get('/funcionarios/:id', FuncionarioController.buscarFuncionarioID);
router.put('/funcionarios/:id', FuncionarioController.atualizarFuncionario);
router.delete('/funcionarios/:id', FuncionarioController.removerFuncionario);

router.post('/login', FuncionarioController.loginFuncionario);

module.exports = router;
