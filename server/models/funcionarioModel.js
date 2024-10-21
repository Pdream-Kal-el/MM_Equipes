const Datastore = require('nedb');
const path = require('path');
const Joi = require('joi');

//definindo schema padrao

const FuncionarioSchema = Joi.object({
    nome: Joi.string().min(3).max(45).required(),
    idade: Joi.number().integer().min(18).required(),
    email: Joi.string().email().min(10).max(70).required(),
    time: Joi.string().min(6).required(),
    githublink:Joi.string().uri().allow('').optional(),
    cargo: Joi.string().min(6).required(),
    cpf: Joi.string().length(14).required(),
    senha: Joi.string().min(7).required(),
})

const FuncionarioSchemaUpdate = Joi.object({
    nome: Joi.string().min(3).max(45),
    idade: Joi.number().integer().min(18),
    email: Joi.string().email().min(10).max(70),
    time: Joi.string().min(6),
    githublink:Joi.string().uri().allow('').optional(),
    cargo: Joi.string().min(6),
    cpf: Joi.string().length(14),
    senha: Joi.string().min(7),
    _id: Joi.string().optional()
}).or("nome","idade","email","time","githublink","cargo","cpf","senha","_id");//pelo menos um precisa ser usado

// Inicializa o banco de dados na pasta 'data'
const db = new Datastore({ filename: path.join(__dirname, '../data/funcionarios.db'), autoload: true });

function inserirFuncionario(Funcionario,callback){
    const { error } = FuncionarioSchema.validate(Funcionario);

    if (error) {
        console.log("Erro de validação:", error.details[0].message);
        return callback(error);
    }
    db.insert(Funcionario, function(err){
        if(err){return console.log(err)}; //caso ocorrer algum erro
            console.log("Novo usuário adicionado!");
            callback(null,Funcionario)
            
        });
    }

function encontrarFuncionario(criterio, callback) {
    db.find(criterio, function (err, funcionarios) {
        if (err) {
            console.log(err); 
            return callback(err, null); 
        }
        
        console.log('Funcionários encontrados:', funcionarios); 
        callback(null, funcionarios); 
    });
}
    

function atualizarFuncionarioRetorno(criterio, substituicao, callback) {
    const { error: errorsub } = FuncionarioSchemaUpdate.validate(substituicao);
    console.log(substituicao)
    console.log(criterio)
    if (errorsub) {
        console.log("Erro de validação substituição:", errorsub.details[0].message); // Usando 'errorsub' aqui
        return callback(errorsub); // Retornando 'errorsub' corretamente
    }

    const { error: errorcrit } = FuncionarioSchemaUpdate.validate(criterio);
    if (errorcrit) {
        console.log("Erro de validação criterio:", errorcrit.details[0].message); // Usando 'errorcrit' aqui
        return callback(errorcrit); // Retornando 'errorcrit' corretamente
    }

    db.update(criterio, {$set:substituicao}, {}, function (err) {
        if (err) {
            return console.log(err);
        }
        db.find(criterio, function (err, Funcionarios) {
            if (err) {
                return callback(err); // Passando o erro para o callback
            }

            callback(null, Funcionarios); // Retornando os funcionários atualizados no callback
        });
        console.log("Funcionário atualizado");
    });
}


function removerFuncionario(criterio, callback) {
    db.remove({ _id: criterio.id }, {}, function (err, numRemoved) {
        if (err) {
            console.log(err); 
            return callback(err, null); 
        }
        console.log('Funcionário removido:', numRemoved); 
        callback(null, numRemoved); 
    });
}

//inserir para testes
/*
inserirFuncionario({
    nome: "Pedro Henrique Vaz",
    idade: 20,
    email: "pedrohvaz08@gmail.com",
    time: "Full-Stack",
    githublink:"https://github.com/Pdream-Kal-el",
    cargo:"Estagiario",
    cpf:"131.900.319-24",
    senha:"PedroHenriqueVaz123321"
}, (error, result) => {
    if (error) {
        console.log("Erro ao inserir Funcionario:", error);
    } else {
        console.log("Funcionario inserido com sucesso:", result);
    }
});

inserirFuncionario({
    nome: "Ana Clara Souza",
    idade: 25,
    email: "ana.clara.souza@gmail.com",
    time: "Back-End",
    githublink: "",
    cargo: "Desenvolvedora Jr",
    cpf: "123.456.789-10",
    senha: "AnaClara123"
}, (error, result) => {
    if (error) {
        console.log("Erro ao inserir Funcionario:", error);
    } else {
        console.log("Funcionario inserido com sucesso:", result);
    }
});

inserirFuncionario({
    nome: "Carlos Eduardo Lima",
    idade: 30,
    email: "carlos.lima@gmail.com",
    time: "DevOps",
    githublink: "",
    cargo: "DevOps Engineer",
    cpf: "987.654.321-10",
    senha: "CarlosEduardo321"
}, (error, result) => {
    if (error) {
        console.log("Erro ao inserir Funcionario:", error);
    } else {
        console.log("Funcionario inserido com sucesso:", result);
    }
});

inserirFuncionario({
    nome: "Fernanda Mendes",
    idade: 28,
    email: "fernanda.mendes@gmail.com",
    time: "Front-End",
    githublink: "",
    cargo: "Desenvolvedora Pleno",
    cpf: "123.321.123-45",
    senha: "FernandaMendes123"
}, (error, result) => {
    if (error) {
        console.log("Erro ao inserir Funcionario:", error);
    } else {
        console.log("Funcionario inserido com sucesso:", result);
    }
});

inserirFuncionario({
    nome: "Roberto Faria",
    idade: 35,
    email: "roberto.faria@gmail.com",
    time: "Full-Stack",
    githublink: "",
    cargo: "Desenvolvedor Senior",
    cpf: "123.456.789-12",
    senha: "RobertoFaria456"
}, (error, result) => {
    if (error) {
        console.log("Erro ao inserir Funcionario:", error);
    } else {
        console.log("Funcionario inserido com sucesso:", result);
    }
});

inserirFuncionario({
    nome: "Mariana Silva",
    idade: 26,
    email: "mariana.silva@gmail.com",
    time: "Back-End",
    githublink: "",
    cargo: "Engenheira de Software",
    cpf: "321.654.987-00",
    senha: "MarianaSilva654"
}, (error, result) => {
    if (error) {
        console.log("Erro ao inserir Funcionario:", error);
    } else {
        console.log("Funcionario inserido com sucesso:", result);
    }
});

inserirFuncionario({
    nome: "Lucas Almeida",
    idade: 24,
    email: "lucas.almeida@gmail.com",
    time: "Mobile",
    githublink: "",
    cargo: "Desenvolvedor Mobile",
    cpf: "123.654.987-12",
    senha: "LucasAlmeida123"
}, (error, result) => {
    if (error) {
        console.log("Erro ao inserir Funcionario:", error);
    } else {
        console.log("Funcionario inserido com sucesso:", result);
    }
});

inserirFuncionario({
    nome: "Paula Ramos",
    idade: 29,
    email: "paula.ramos@gmail.com",
    time: "UI/UX",
    githublink: "",
    cargo: "Design UX",
    cpf: "987.123.456-78",
    senha: "PaulaRamosDesign"
}, (error, result) => {
    if (error) {
        console.log("Erro ao inserir Funcionario:", error);
    } else {
        console.log("Funcionario inserido com sucesso:", result);
    }
});

inserirFuncionario({
    nome: "Jorge Pereira",
    idade: 32,
    email: "jorge.pereira@gmail.com",
    time: "DevOps",
    githublink: "",
    cargo: "DevOps Manager",
    cpf: "654.321.987-00",
    senha: "JorgeDevOps321"
}, (error, result) => {
    if (error) {
        console.log("Erro ao inserir Funcionario:", error);
    } else {
        console.log("Funcionario inserido com sucesso:", result);
    }
});

inserirFuncionario({
    nome: "Vanessa Monteiro",
    idade: 27,
    email: "vanessa.monteiro@gmail.com",
    time: "Back-End",
    githublink: "",
    cargo: "Desenvolvedora Jr",
    cpf: "321.987.654-10",
    senha: "VanessaMonteiro654"
}, (error, result) => {
    if (error) {
        console.log("Erro ao inserir Funcionario:", error);
    } else {
        console.log("Funcionario inserido com sucesso:", result);
    }
});

inserirFuncionario({
    nome: "Felipe Costa",
    idade: 22,
    email: "felipe.costa@gmail.com",
    time: "Mobile",
    githublink: "",
    cargo: "Desenvolvedor Jr",
    cpf: "321.654.789-12",
    senha: "FelipeCosta123"
}, (error, result) => {
    if (error) {
        console.log("Erro ao inserir Funcionario:", error);
    } else {
        console.log("Funcionario inserido com sucesso:", result);
    }
});

*/
    module.exports = {
        db,
        inserirFuncionario,
        encontrarFuncionario,
        atualizarFuncionarioRetorno,
        removerFuncionario
    };