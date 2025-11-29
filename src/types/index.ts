export interface Livro {
    id: number;
    nome: string;
    autor: string;
    categoria: string;
    disponivel: boolean;
}

export interface Cliente {
    id: number;
    nome: string;
    email: string;
}

export interface Retirada {
    id: number;
    clienteid: number;
    livroid: number;
    dataretirada: Date | string;
    datadevolucao: Date | string;
    datadevolucaoreal?: Date | string;
}
