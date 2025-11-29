import axios from "axios"

const URI = "http://localhost:3000/retiradas";

async function listar() {
    const response = await axios.get(URI);
    return response.data;
}

async function registrarRetirada(retirada: any) {
    const response = await axios.post(URI, retirada);
    return response.data;
}

async function devolverLivro(id: string) {
    const response = await axios.post(`${URI}/${id}`);
    return response.data;
}

export default {
    listar,
    registrarRetirada,
    devolverLivro
}