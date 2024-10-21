# Proposta A
Aqui somos um time muito unido e integrado; gostamos de nos comunicar, porém somos esquecidos. :(

Você pode nos ajudar criando um sistema que permita o armazenamento do nome, e-mail e telefone de cada pessoa do time?

Vai ser legal se você criar uma aplicação em Node + React/Angular, mas fique à vontade para escolher suas tecnologias. No banco de dados, você pode usar NeDB para facilitar. 
Alguns pontos importantes:
- Use sua criatividade; valorizamos muito o frontend e a experiência do usuário.
- Não se esqueça das validações.
- Faça um CRUD completo.

## Descrição

Este projeto é um sistema desenvolvido para gerenciar as informações dos funcionários de um time, permitindo o cadastro, login, acesso ao perfil de outros funcionários e a opção de deletar um funcionário. A proposta é facilitar a comunicação e a organização entre os membros do time, que muitas vezes esquecem informações importantes.

## Funcionalidades

- **Cadastro de Funcionários**: Permite que novos funcionários se cadastrem com nome, e-mail e telefone.
- **Login**: Funcionários podem fazer login em suas contas para acessar suas informações.
- **Perfil de Funcionários**: Acesso ao perfil de outros funcionários, organizados por times.
- **Deletar Funcionário**: Opção para remover um funcionário do sistema.

## Tecnologias Utilizadas

- **Frontend**: React
- **Backend**: Node.js
- **Banco de Dados**: NeDB
- **Express**

## Como rodar?

1. **Baixe o arquivo zip e descompacte.**

- **Client**
  - Na pasta `Cliente`, abra um terminal no diretório e execute o comando: `npm i`.
  - Após baixar todas as dependências, execute o comando: `npm run dev`.
  - A aplicação deve rodar na URL: **[http://localhost:5173](http://localhost:5173)**.

- **Server**
  - Na pasta `server`, execute o comando: `npm i`.
  - Em seguida, ainda no diretório `server`, execute o comando: `npm run start`.

## Solução

<p align="center" style="margin:50px;">
![LogoSejaUmGigante](https://github.com/user-attachments/assets/26373b3a-43c8-420e-a066-0446df0289df)
</p>

Nós da Seja Um Gigante, com base na nossa equipe de análise de requisitos, implementamos um sistema completo que consiste em:
- Login de um Funcionário.
- Cadastro de um novo Funcionário.
- Visualização da organização de cada equipe, além das informações dos membros.
- Possibilidade de deletar e editar informações de cada funcionário.

## Tela Inicial

A tela inicial consiste em um cabeçalho onde é possível navegar entre as páginas: Login, Cadastrar e Sobre. Ela já está configurada para abrir na página de Login por padrão.

## Login

No Login, é possível acessar a conta de um funcionário digitando seu e-mail e senha. Quando as credenciais são válidas, o usuário é automaticamente redirecionado para a página inicial.
![image](https://github.com/user-attachments/assets/25442362-798c-44a7-ae9b-5acfdf7abe85)

## Cadastro

No cadastro, é possível inserir novas informações, que serão validadas antes de serem registradas. As informações exigidas são: Nome, E-mail, GitHub Link, Senha, Equipe, Cargo e CPF.
![image](https://github.com/user-attachments/assets/e012f343-95c9-43e6-b75c-23211ef62978)

Após a aprovação do cadastro, o usuário é automaticamente redirecionado para a página de login.

## Home

Quando o usuário está logado, ele pode visualizar os times e cada membro das equipes, que são apresentados com títulos e cores diferentes.
![image](https://github.com/user-attachments/assets/8daba2ba-af18-4bef-8c2b-9ab387472c6d)

Cada membro é um botão que, ao ser clicado, leva o usuário à página de visualização das informações do funcionário.

## Funcionário

Nesta seção, é possível tanto visualizar as informações quanto alterá-las e reenviar as atualizações ao servidor. Há também um botão para deletar que exige uma confirmação do usuário antes de prosseguir com a remoção.
![image](https://github.com/user-attachments/assets/dde81a6b-a6d4-4b02-aaff-07c30c275a22)
