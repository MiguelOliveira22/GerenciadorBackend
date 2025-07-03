import express from 'express';
import PG from "pg";
import dotenv from 'dotenv';
import { Status } from './status';

dotenv.config();

var app = express();
var client = new PG.Client(process.env.CONNECTION_STRING);

app.use(express.json());

app.post("/criar", async (req, res) => {
    try {
        await client.query("INSERT INTO Tarefas (Titulo, Descricao, StatusTarefa, DataDeCriacao) VALUES ($1::text, $2::text, $3::int, Now())", [req.body.titulo, req.body.descricao, req.body.status]);
        res.status(201).send();
    }
    catch (e) {
        console.log(e);
        res.status(400).send();
    }
});

app.get("/listar/:id/:width", async (req, res) => {
    const resp = await client.query("SELECT * FROM Tarefas");

    res.send(resp.rows);
});

app.put("/atualizar/:id", (req, res) => {
    res.status(200);
});

app.delete("/deletar/:id", (req, res) => {
    res.status(204);
});

app.listen(3300, async () => {
    await client.connect();

    console.log("Iniciado ");
});