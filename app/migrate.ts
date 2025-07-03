import fs from 'fs';
import PG from "pg";
import dotenv from 'dotenv';

var argumentos = process.argv.splice(2);
if(argumentos.length != 1)
    throw new Error("Use 'node migrate.ts [Nome Do Script SQL Na Pasta ./sql]'");

var path = argumentos[0];
var data = fs.readFileSync(`${process.cwd()}/sql/${path}`);

dotenv.config();
var client = new PG.Client(process.env.CONNECTION_STRING);

await client.connect();
var result = await client.query(data.toString());

console.log(result);

console.log("Concluido com êxito!");
process.exit(0);