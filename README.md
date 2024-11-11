# Golden Raspberry Awards

Uma API para obter o maior e menor intervalo entre premiações consecutivas de produtores de filmes

## Pré requisitos

- Node v23.1.0

## Executando localmente

Após a clonagem do repositório, basta editar ou substituir o arquivo "movies.csv" que está na raiz do projeto e executar os seguintes comandos:

- `npm run dev`: Para iniciar a API
- `npm run test`: Para executar o teste de integração

Obs.: Caso queira usar outro arquivo, basta executar o comando `npm run dev -- path/to/file.csv`

Com a API em execução, é possível acessar o endpoint <http://localhost:3333/producers/awards/intervals> através do navegador ou qualquer interface de requisições HTTP, como Postman, Insomnia, HTTPie, etc.

Caso tenha a extensão "REST Client" instalada no VSCode, é possível também utilizar o arquivo client.http presente na raiz do projeto.

### Requisito do sistema

Ler o arquivo CSV dos filmes e inserir os dados em uma base de dados ao iniciar a aplicação.

### Requisito da API

Obter o produtor com maior intervalo entre dois prêmios consecutivos, e o que obteve dois prêmios mais rápido, seguindo a especificação a seguir:

```json
{
  "min": [
    {
      "producer": "Producer 1",
      "interval": 1,
      "previousWin": 2008,
      "followingWin": 2009
    },
    {
      "producer": "Producer 2",
      "interval": 1,
      "previousWin": 2018,
      "followingWin": 2019
    }
  ],
  "max": [
    {
      "producer": "Producer 1",
      "interval": 99,
      "previousWin": 1900,
      "followingWin": 1999
    },
  ]
}
```

### Requisitos não funcionais

- O web service RESTful deve ser implementado com base no nível 2 de maturidade de Richardson;
- Devem ser implementados somente testes de integração. Eles devem garantir que os dados obtidos estão de acordo com os dados fornecidos na proposta;
- O banco de dados deve estar em memória utilizando um SGBD embarcado (por exemplo, H2). Nenhuma instalação externa deve ser necessária;
- A aplicação deve conter um readme com instruções para rodar o projeto e os testes de integração.

### Considerações finais

Por se tratar de uma API simples, foi utilizado apenas módulos nativos do NodeJS. Para que fosse possível atender todos os requisitos não utilizando nenhuma biblioteca de terceiros, foi utilizado a última versão disponível atualmente do Node (v23.1.0), que não é LTS. Além disso também foi utilizado uma flag de 'experimental' para possibilitar o uso do SQLite nativo do Node.
