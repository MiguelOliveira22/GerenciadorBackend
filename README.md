# GerenciadorBackend
Projeto Entrevista

## Como rodar o projeto:

Para começar, abra a pasta app do projeto a partir de sua raiz com o comando abaixo:
```bash
cd app
```

#### O projeto depende diretamente do uso do mecanismo de banco de dados PostgreSQL. Portanto, instale-o de acordo com a documentação encontrada no site da desenvolvedora. [PostgreSQL Download](https://www.postgresql.org/download/).

#### Depois instale as dependências abaixo por meio do NPM ou seu gerenciador de pacotes de preferência:
- Typescript
- TSX
- PG
- Express
- DotEnv
- Cors
- @Types/Typescript
- @Types/Express
- @Types/PG
- @Types/Cors

O script usado para instalar todas elas é esse:
```bash
npm run install-dependencies
```

Após isso, lembre-se de abrir a pasta sql e confirmar que os scripts inseridos lá dentro não irão conflitar com a sua arquitetura de banco de dados. Se não houverem conflitos, execute o comando abaixo:
```bash
npm run configure
```

Já se houverem erros, eu recomendo executar cada script não conflitante com o comando abaixo:
```bash
npx tsx migrate.ts <nomeArquivoSql1> [nomeArquivoSql2] ...
```

Depois, para poder executar a API, crie um arquivo .env como no modelo abaixo:
```dotenv
CONNECTION_STRING=<CONNECTION STRING DO POSTGRESQL>
PORT=<PORTA DE PREFERÊNCIA DO USUÁRIO>
TIMEZONE=<TIMEZONE DO USUÁRIO>
```

Por fim, chame o script abaixo:
```bash
npm run start
```

## Endpoints da API

#### Retorna um recorte das tarefas (paginação)

```http
GET /listar/:offset/:width
```

| Parâmetro   | Tipo       | Descrição                                                             |
| :---------- | :--------- | :-------------------------------------------------------------------- |
| `offset`    | `int`      | **Obrigatório**. Começa a listar a partir deste indice de elemento.   |
| `width`     | `int`      | **Obrigatório**. Quantos elementos listar a patir do indice `offset`. |

#### Retorna uma tarefa de acordo com seu ID

```http
GET /tarefa/:id
```

| Parâmetro   | Tipo       | Descrição                                                             |
| :---------- | :--------- | :-------------------------------------------------------------------- |
| `id`        | `int`      | **Obrigatório**. Id da tarefa                                         |

#### Retorna todos os Status possíveis

```http
GET /status
```

#### Retorna quantas tarefas foram cadastradas.

```http
GET /tarefas
```

#### Adiciona uma tarefa ao banco de dados

```http
POST /criar
```
| Parâmetro   | Tipo       | Descrição                                                                  |
| :---------- | :--------- | :------------------------------------------------------------------------- |
| `body`      | `object`   | **Obrigatório**. Objeto a ser adicionado no banco de dados. Modelo abaixo. |

```json
{
    "titulo": string(30-max),
    "descricao": string(200-max),
    "status": int(0, 1 ou 2) -> Relacionado com a tabela do BD
}
```

#### Atualiza uma tarefa no banco de dados

```http
PUT /atualizar/:id
```

| Parâmetro   | Tipo       | Descrição                                                                           |
| :---------- | :--------- | :---------------------------------------------------------------------------------- |
| `id`        | `string`   | **Obrigatório**. O ID do item que você quer atualizar                               |
| `body`      | `object`   | **Obrigatório**. Objeto a ser trocado no banco de dados com o do ID. Modelo abaixo. |

```json
{
    "titulo": string(30-max),
    "descricao": string(200-max),
    "status": int(1, 2 ou 3) -> Relacionado com a tabela do BD
}
```

#### Apaga uma tarefa do banco de dados

```http
DELETE /deletar/:id
```

| Parâmetro   | Tipo       | Descrição                                          |
| :---------- | :--------- | :------------------------------------------------- |
| `id`        | `int`      | **Obrigatório**. O ID do item que você quer apagar |

## Prints e vídeos da aplicação em funcionamento