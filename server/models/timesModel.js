const Datastore = require('nedb');
const path = require('path');
const Joi = require('joi');

// Schema para validação de Times na inserção
const TimesSchema = Joi.object({
    nome: Joi.string().min(3).max(45).required(),
    quantidadeFuncionarios: Joi.number().integer().min(1).required(),
    corPrincipal: Joi.string().length(7).required(),
    corSecundaria: Joi.string().length(7).required()
});

// Schema para validação de Times na atualização
const TimesSchemaUpdate = Joi.object({
    nome: Joi.string().min(3).max(45),
    quantidadeFuncionarios: Joi.number().integer().min(1),
    corPrincipal: Joi.string().length(7),
    corSecundaria: Joi.string().length(7)
}).or("nome", "quantidadeFuncionarios", "corPrincipal", "corSecundaria");



const db = new Datastore({ filename: path.join(__dirname, '../data/times.db'), autoload: true });

// Função para inserir um Time
function inserirTime(Time, callback) {
    const { error } = TimesSchema.validate(Time);
    if (error) {
        console.log("Erro de validação:", error.details[0].message);
        return callback(error);
    }
    db.insert(Time, function (err) {
        if (err) { 
            return console.log(err); 
        }
        callback(null, Time);
    });
}

// Função para encontrar Times
function encontrarTime(criterio, callback) {
    db.find(criterio, function (err, Times) {
        if (err) { 
            return console.log(err); 
        }
        console.log(Times);
        callback(null, Times);
    });
}

// Função para atualizar um Time e retornar o atualizado
function atualizarTimeRetorno(criterio, substituicao, callback) {
    const { error: errorsub } = TimesSchemaUpdate.validate(substituicao);
    if (errorsub) {
        console.log("Erro de validação:", errorsub.details[0].message);
        return callback(errorsub);
    }

    db.update(criterio, { $set: substituicao }, {}, function (err) {
        if (err) {
            return console.log(err);
        }
        db.find(criterio, function (err, Times) {
            if (err) {
                return callback(err); // Passa o erro para o callback
            }
            callback(null, Times); // Retorna o Time atualizado no callback
        });
        console.log("Time atualizado");
    });
}

// Função para remover um Time
function removerTime(criterio, callback) {
    db.remove(criterio, {}, function (err, numRemoved) {
        if (err) { 
            return console.log(err); 
        }
        callback(null, numRemoved);
        console.log("Time removido");
    });
}
//Inserir para testes:
/*
inserirTime({
    nome: "Front-End",
    quantidadeFuncionarios: 7,
    corPrincipal: "#FF00FF",
    corSecundaria: "#FFFF00"
}, (error, result) => {
    if (error) {
        console.log("Erro ao inserir time:", error);
    } else {
        console.log("Time inserido com sucesso:", result);
    }
});
inserirTime({
    nome: "Devops",
    quantidadeFuncionarios: 10,
    corPrincipal: "#FF00FF",
    corSecundaria: "#FFFF00"
}, (error, result) => {
    if (error) {
        console.log("Erro ao inserir time:", error);
    } else {
        console.log("Time inserido com sucesso:", result);
    }
});
inserirTime({
    nome: "UX e Design",
    quantidadeFuncionarios: 4,
    corPrincipal: "#FF00FF",
    corSecundaria: "#FFFF00"
}, (error, result) => {
    if (error) {
        console.log("Erro ao inserir time:", error);
    } else {
        console.log("Time inserido com sucesso:", result);
    }
});
inserirTime({
    nome: "Analise de Requisitos",
    quantidadeFuncionarios: 3,
    corPrincipal: "#FF00FF",
    corSecundaria: "#FFFF00"
}, (error, result) => {
    if (error) {
        console.log("Erro ao inserir time:", error);
    } else {
        console.log("Time inserido com sucesso:", result);
    }
});*/
module.exports = {
    db,
    inserirTime,
    encontrarTime,
    atualizarTimeRetorno,
    removerTime
};
