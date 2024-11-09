# Golden Raspberry Awards

Uma API para obter o maior e menor intervalor entre premiações consecutivas de produtores de filmes

## Pré requisitos

- Node v23.1.0

## Executando localmente

Após a clonagem do repositório, basta editar ou substituir o arquivo "movies.csv" que está dentro da pasta "test" e executar os seguintes comandos:

- `npm run dev`: Para iniciar a API
- `npm run test`: Para executar o teste de integração

Com a API em execução, é possível acessar o endpoint <http://localhost:3333/awards/intervals> através do navegador ou qualquer interface de requisições HTTP, como Postman, Insomnia, HTTPie, etc.

Caso tenha a extensão "REST Client" instalada no VSCode, é possível também utilizar o arquivo client.http presente na raiz do projeto.
