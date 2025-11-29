import axios from "axios"

const URI = "http://localhost:3000/clientes";

async function listar() {
    const response = await axios.get(URI);
    return response.data;
}

async function inserir(cliente: any) {
    const response = await axios.post(URI, cliente);
    return response.data;
}

async function buscarPorId(id: string) {
    const response = await axios.get(`${URI}/${id}`);
    return response.data;
}

async function buscarPorEmail(email: string) {
    const response = await axios.get(`${URI}/email/${email}`);
    return response.data;
}
async function atualizar(id: string, cliente: any) {
    const response = await axios.put(`${URI}/${id}`, cliente);
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
    buscarPorEmail,
    atualizar,
    deletar
}