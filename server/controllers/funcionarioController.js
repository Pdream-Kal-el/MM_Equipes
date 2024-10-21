const {
    inserirFuncionario,
    encontrarFuncionario,
    atualizarFuncionarioRetorno,
    removerFuncionario
} = require('../models/funcionarioModel.js');
const bcrypt = require('bcryptjs');
const FuncionarioController = {
    adicionarFuncionario: async (req, res) => {
        const funcionario = req.body;
    
        // Hash da senha
        try {
            const hashedPassword = await bcrypt.hash(funcionario.senha, 10);
            funcionario.senha = hashedPassword; // Substitui a senha pela versão hash
    
            // Insira o funcionário com a senha hash
            inserirFuncionario(funcionario, (error, result) => {
                if (error) {
                    return res.status(400).json({ error: error.details[0].message });
                }
                res.status(201).json({ message: "Funcionário adicionado!", funcionario: result });
            });
        } catch (error) {
            return res.status(500).json({ message: "Erro ao hash da senha" });
        }
    },
    
    buscarFuncionarioID: (req, res) => {
        const { id } = req.params; // Pegando o ID nos parâmetros da rota
        if (!id) {
            return res.status(400).json({ message: "ID do funcionário não fornecido" });
        }
    
        // Buscar funcionário com base no _id
        encontrarFuncionario({ _id: id }, (error, funcionarios) => {
            if (error) {
                return res.status(500).json({ error: "Erro ao buscar funcionário" });
            }
            if (funcionarios.length === 0) {
                return res.status(404).json({ message: "Funcionário não encontrado" });
            }
            res.status(200).json(funcionarios[0]); // Retorna o funcionário encontrado
        });
    },

    buscarFuncionario: (req, res) => {
        const criterio = req.query; // Usar req.query para buscar com base nos parâmetros da URL
        encontrarFuncionario(criterio, (error, funcionarios) => {
            if (error) {
                return res.status(500).json({ error: "Erro ao buscar funcionários" });
            }
            res.status(200).json(funcionarios);
        });
    },
    
    
    atualizarFuncionario: (req, res) => {
        const id = req.params.id; // O id vem da rota
        const dadosAtualizados = req.body; // Dados a serem atualizados
        
        // Definir o critério de busca, neste caso pelo _id
        const criterio = { _id: id };
    
        // Agora usa a função de atualização do seu model
        atualizarFuncionarioRetorno(criterio, dadosAtualizados , (error, funcionariosAtualizados) => {
            if (error) {
                return res.status(500).json({ error: "Erro ao atualizar funcionário no banco de dados" });
            }
            if (!funcionariosAtualizados || funcionariosAtualizados.length === 0) {
                return res.status(404).json({ error: "Funcionário não encontrado" });
            }
            res.status(200).json({ message: "Funcionário atualizado com sucesso!", funcionario: funcionariosAtualizados });
        });
    },
    
      
    
    removerFuncionario: (req, res) => {
        const criterio = req.params; // Pegando ID nos parâmetros
        removerFuncionario(criterio, (error, numRemoved) => {
            if (error) {
                return res.status(500).json({ error: "Erro ao remover funcionário" });
            }
            if (numRemoved === 0) {
                return res.status(404).json({ message: "Funcionário não encontrado" });
            }
            res.status(200).json({ message: "Funcionário removido", numRemoved });
        });
    },
    loginFuncionario: (req, res) => {
        const { email, senha } = req.body;
    
        // Busca o funcionário com base no email
        encontrarFuncionario({ email }, (err, funcionarios) => {
            if (err) {
                return res.status(500).json({ message: "Erro no servidor" });
            }
    
            if (funcionarios.length === 0) {
                return res.status(404).json({ success: false, message: "Funcionário não encontrado" });
            }
            
            const funcionario = funcionarios[0];
    
            // Verificar a senha usando bcrypt
            bcrypt.compare(senha, funcionario.senha, (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Erro ao verificar a senha" });
                }
                
                if (result) {
                    // Senha correta, login bem-sucedido
                    return res.status(200).json({ success: true, funcionario });
                } else {
                    // Senha incorreta
                    return res.status(401).json({ success: false, message: "Senha incorreta" });
                }
            });
        });
    }
};
// Exportando o controlador como um objeto
module.exports = FuncionarioController;
