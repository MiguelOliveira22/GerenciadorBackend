import express from 'express';
import PG from "pg";

var app = express();

var client = new PG.Client();

app.get("/", async (req, res) => {
    //const resp = await client.query("SELECT $1::text as message", ["Hello World"]);
    //console.log(resp.rows[0].message);

    res.send("resp.rows[0].message");
});

app.listen(3300, async () => {
    //await client.connect();

    console.log("Iniciado ");
});