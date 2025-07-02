import express from 'express';
import PG from "pg";
import dotenv from 'dotenv';

dotenv.config();
var app = express();
var client = new PG.Client(process.env.CONNECTION_STRING);

app.get("/", async (req, res) => {
    const resp = await client.query("SELECT $1::text as message", ["Hello World"]);

    res.send(resp.rows[0].message);
});

app.listen(3300, async () => {
    await client.connect();

    console.log("Iniciado ");
});