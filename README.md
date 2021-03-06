[![Codacy Badge](https://app.codacy.com/project/badge/Grade/e469354d3c474f638f2d1171637c4e12)](https://www.codacy.com/gh/prdossantos/chat-api/dashboard?utm_source=github.com&utm_medium=referral&utm_content=prdossantos/chat-api&utm_campaign=Badge_Grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/e469354d3c474f638f2d1171637c4e12)](https://www.codacy.com/gh/prdossantos/chat-api/dashboard?utm_source=github.com&utm_medium=referral&utm_content=prdossantos/chat-api&utm_campaign=Badge_Coverage)

# Chat

Desafio chat. 

## Arquitetura

**Linguagem**: NodeJs com framework ExpressJs

**Banco de Dados**: MongoDB

**GraphQL API**: Apollo GraphQL

## Como usar localmente

1.  Clone este repositório e execute o comando: `npm install`.
2.  Execute o comando: `npm run dev`.
3.  Você precisa de uma conexão com o MongoDB
4.  Você pode alterar a conexão de acesso do MongoDB no arquivo `.env`.

\*Por padrão o projeto irá rodar na porta: 8086( <http://localhost:8086> ), isso também é uma variável no `.env`.

## Facilitando a vida

-   O arquivo `.env` foi enviado para facilitar a vida da pessoa que irá testar, em um ambiente real isso é removido do repositório.
-   O server do Apollo GraphQL, está contido nest projeto utilizando a porta: **4000**

### Use o docker ;)

Caso você tenha o docker e docker-compose instalados, siga os comandos:
1.  `docker-compose build`
2.  `docker-compose up`, isso pode demorar um pouco dependendo do seu PC.
Aguarde as mensaegens: 

-   `chat-api    | app listening on port 8086` 
-   `chat-api    | Server graphql ready at http://localhost:4000` 
-   `chat-api    | MongoDB connected` 

\*O MongoDB utiliza a porta **27017**, caso esteja em uso no seu PC é necessário parar o serviço.

\*Se quiser alterar as portas de conexão utilizando docker, faça isso no arquivo `docker-compose.yml`

## Estrutura de pastas

O projeto segue a seguinte estrutura.

```js
src/
  - controllers   # Contém os controladores de rotas
  - models        # Contém os modelos do Banco de Dados
  - __tests__     # Contém os testes unitário e de integração
```

## REST API Documentação

A documentação completa está: 

-   Localmente, acessando o arquivo `./openapi.yml`.

## GraphQL API

A API irá ser iniciada em: `http://localhost:4000` 

-   Utilize o sandbox do Apollo Studio para testes <https://studio.apollographql.com/sandbox/explorer>.

## Como rodar os testes

Os testes estão aplicados na API REST.
Para rodar os testes utilize o camando abaixo:

Isso irá rodar todos os testes
`npm run test -- --verbose`

Também será gerado um relatório de cobertura de código na pasta `./coverage`.
Você pode visualizar no navegador acessessando `./coverage/lcov-report/index.html`
