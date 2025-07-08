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
    "status": int(1, 2 ou 3) -> Relacionado com a tabela do BD
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
![Captura de tela de 2025-07-07 21-34-50](https://github.com/user-attachments/assets/b7b3624e-aef5-4619-ade8-c2a345c2dd31)
![Captura de tela de 2025-07-07 21-35-16](https://github.com/user-attachments/assets/09fe0ce1-d182-4381-8763-f270b711b413)
![Captura de tela de 2025-07-07 21-35-28](https://github.com/user-attachments/assets/f51981cf-ae95-41a5-ae66-ee2e5e2dc404)
![Captura de tela de 2025-07-07 21-35-38](https://github.com/user-attachments/assets/d3f8a254-6fb0-489d-a194-eda840a0d1d1)
![Captura de tela de 2025-07-07 21-39-03](https://github.com/user-attachments/assets/ca70641b-388b-4438-acbc-f7e9e765b515)
![Captura de tela de 2025-07-07 21-40-09](https://github.com/user-attachments/assets/62a8704a-4d0d-455e-ac06-3565b2d29838)
![Captura de tela de 2025-07-07 21-40-18](https://github.com/user-attachments/assets/6f450eeb-8a43-4769-907c-5ec97e936dbc)
