import axios from "axios"

const URI = "http://localhost:3000/livros";

async function listar() {
    const response = await axios.get(URI);
    return response.data;
}

async function inserir(livro: any) {
    const response = await axios.post(URI, livro);
    return response.data;
}

async function buscarPorId(id: string) {
    const response = await axios.get(`${URI}/${id}`);
    return response.data;
}

async function atualizar(id: string, livro: any) {
    const response = await axios.put(`${URI}/${id}`, livro);
    return response.data;
}

async function deletar(id: string) {
    const response = await axios.delete(`${URI}/${id}`);
    return response.data;
}

export default {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}