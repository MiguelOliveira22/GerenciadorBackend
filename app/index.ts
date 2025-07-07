import express from 'express';
import PG from "pg";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

var app = express();
var client = new PG.Client(process.env.CONNECTION_STRING);

app.use(express.json());
app.use(cors());

app.post("/criar", async (req, res) => {
    try {
        const linesChanged = await client.query("INSERT INTO Tarefas (Titulo, Descricao, StatusTarefa, DataDeCriacao) " +
            "VALUES ($1::text, $2::text, $3::int, Now())", [req.body.titulo, req.body.descricao, req.body.status]
        );
        
        if(linesChanged.rowCount != null && linesChanged.rowCount > 0)
            res.status(201).send();
        else
            res.status(404).send();
    }
    catch (e) {
        res.status(400).send();
    }
});

app.get("/listar/:offset/:width", async (req, res) => {
    try{
        const resp = await client.query("SELECT T.Id, T.Titulo, T.Descricao, S.StatusNome, T.DataDeCriacao " +
            "FROM Tarefas AS T INNER JOIN StatusPossiveis AS S ON T.StatusTarefa = S.StatusId ORDER BY T.Id " +
            "LIMIT $1::int OFFSET $2::int;", [req.params.width, req.params.offset]
        );

        res.send(resp.rows);
    }
    catch (e) {
        res.status(400).send();
    }
});

app.get("/tarefa/:id", async (req, res) => {
    try{
        const resp = await client.query("SELECT T.Id, T.Titulo, T.Descricao, S.StatusNome, T.DataDeCriacao " +
            "FROM Tarefas AS T INNER JOIN StatusPossiveis AS S ON T.StatusTarefa = S.StatusId WHERE T.Id = $1::int;",
            [req.params.id]
        );

        if (resp.rowCount != null && resp.rowCount < 1) {
            res.status(404).send();
        }
        else {
            res.send(resp.rows);
        }
    }
    catch (e) {
        res.status(400).send();
    }
});

app.get("/status/", async (req, res) => {
    const resp = await client.query("SELECT * FROM StatusPossiveis");

    res.send(resp.rows);
});

app.put("/atualizar/:id", async (req, res) => {
    try {
        const linesChanged = await client.query("UPDATE Tarefas SET Titulo = $1::text, Descricao = $2::text, " +
            "StatusTarefa = $3::int WHERE Id = $4::int",
            [req.body.titulo, req.body.descricao, req.body.status, req.params.id]
        );
        
        if(linesChanged.rowCount != null && linesChanged.rowCount > 0)
            res.status(200).send();
        else
            res.status(404).send();
    }
    catch (e) {
        res.status(400).send();
    }
});

app.delete("/deletar/:id", async (req, res) => {
    try {
        const linesChanged = await client.query("DELETE FROM Tarefas WHERE Id = $1::int", [req.params.id]);

        if(linesChanged.rowCount != null && linesChanged.rowCount > 0)
            res.status(204).send();
        else
            res.status(404).send();
    }
    catch (e) {
        res.status(404).send();
    }
});

app.listen(process.env.PORT, async () => {
    await client.connect();
    
    process.env.TZ = process.env.TIMEZONE;
    console.log(`Iniciado na porta: ${process.env.PORT}`);
});