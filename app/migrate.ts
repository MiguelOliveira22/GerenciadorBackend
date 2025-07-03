import fs from 'fs';
import PG from "pg";
import dotenv from 'dotenv';

dotenv.config();

var argumentos = process.argv.splice(2);
if(argumentos.length < 1)
    throw new Error("Use 'node migrate.ts [Nome Dos Scripts SQL Na Pasta ./sql]'");

var client = new PG.Client(process.env.CONNECTION_STRING);
await client.connect();

for(var i = 0; i < argumentos.length; i ++) {
    var data = fs.readFileSync(`${process.cwd()}/sql/${argumentos[i]}`);
    var result = await client.query(data.toString());

    console.log(result);
}

console.log("Concluido com êxito!");
process.exit(0);