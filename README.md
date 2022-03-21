# template-nodejs

## Motivação

Esse template diminui a burocracia de criar um server Node.js/Express, possuindo a maior parte das configurações inicias já feitas. O template segue os padrões de projetos da Driven Education.

## Dependencias

### Produção
- express
- pg 
- cors
- dotenv
- jest 
- babel-jest
- supertest
- bcrypt
- uuid
- joi

### Dev
- eslint (airbnb base)
- husky
- nodemon
- faker-br

## Como usar?

1- Crie um repositório utilizando esse template ao clicar no botão "use this template" acima. 

2 -  Dê um ```git clone``` em seu repositorio

3 - Na pasta do projeto, dê um ```npm install```

4 - Adicione seus arquivos .env na pasta raiz

5 - De um ```npx husky install```

6 - De um ```npm run start:dev```

7- Opcionalmente, adicione os detalhes do seu projeto no package.json (nome, url, etc)

Há tres scripts iniciais:

    "start": "NODE_ENV=prod node src/server.js",
    "start:dev": "NODE_ENV=dev nodemon src/server.js",
    "test": "NODE_ENV=test npx jest"

### Fique a vontade para melhorar esse template ou me dar dicas de como fazer isso.
