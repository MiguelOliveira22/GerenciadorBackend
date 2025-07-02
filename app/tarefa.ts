import { Status } from "./status";

export type Tarefa = {
    id: number,
    titulo: string,
    descricao: string,
    status: Status,
    dataDeCriacao: Date
};