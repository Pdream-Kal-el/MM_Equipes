const {
    inserirTime,
    encontrarTime,
    atualizarTimeRetorno,
    removerTime
} = require('../models/timesModel.js');

const TimeController = {
    adicionarTime: (req, res) => {
        const Time = req.body;
        inserirTime(Time, (error, result) => {
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            res.status(201).json({ message: "Time adicionado!", Time: result });
        });
    },
    
    buscarTime: (req, res) => {
        const criterio = req.query; // Usar req.query para buscar com base nos parâmetros da URL
        encontrarTime(criterio, (error, Times) => {
            if (error) {
                return res.status(500).json({ error: "Erro ao buscar Time" });
            }
            res.status(200).json(Times);
        });
    },
    
    atualizarTime: (req, res) => {
        const criterio = req.params; // Pegando ID nos parâmetros
        const substituicao = req.body; // Dados de atualização
        atualizarTimeRetorno(criterio, substituicao, (error, Times) => {
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            res.status(200).json({ message: "Time atualizado!", Times });
        });
    },
    
    removerTime: (req, res) => {
        const criterio = req.params; // Pegando ID nos parâmetros
        removerTime(criterio, (error, numRemoved) => {
            if (error) {
                return res.status(500).json({ error: "Erro ao remover Time" });
            }
            if (numRemoved === 0) {
                return res.status(404).json({ message: "Time não encontrado" });
            }
            res.status(200).json({ message: "Time removido", numRemoved });
        });
    }
};

// Exportando o controlador como um objeto
module.exports = TimeController;
