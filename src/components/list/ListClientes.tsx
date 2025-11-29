import { useEffect, useState } from "react";
import ClienteApiService from "../../service/ClienteApiService";
import type { Cliente } from "../../types";
import { alertApiError } from "../../service/ApiErrorHelper";

export default function ListClientes() {
    const [listaClientes, setListaClientes] = useState<Cliente[]>([]);

    useEffect(() => {
        ClienteApiService.listar()
            .then(clientes => setListaClientes(clientes))
            .catch(err => alertApiError(err, "Falha ao carregar clientes"));
    }, []);


    const handleUpdate = (id: number) => {
        if (confirm("Deseja realmente atualizar este cliente?")) {
            const cliente = listaClientes.find(c => c.id === id);
            if (!cliente) return;

            // pede novos valores ao usuário (ou cancele)
            const nome = prompt("Nome:", cliente.nome);
            if (nome === null) return;
            const email = prompt("Email:", cliente.email);
            if (email === null) return;

            const atualizado: Cliente = { ...cliente, nome, email };

            ClienteApiService.atualizar(id.toString(), atualizado)
                .then(() => {
                    setListaClientes(prev => prev.map(c => c.id === id ? atualizado : c));
                    alert("Cliente atualizado com sucesso!");
                })
                .catch(err => alertApiError(err, "Erro ao atualizar cliente"));
        }
    };

    const handleDelete = (id: number) => {
        if (confirm("Deseja realmente excluir este cliente?")) {
            ClienteApiService.deletar(id.toString())
                .then(() => {
                    setListaClientes(listaClientes.filter(c => c.id !== id));
                    alert("Cliente excluído com sucesso!");
                })
                .catch(err => alertApiError(err, "Erro ao excluir cliente"));
        }
    };

    return (
        <div className="w3-container w3-padding-16">
            <h2>Lista de Clientes</h2>
            <table className="w3-table w3-striped w3-bordered">
                <thead>
                    <tr className="w3-blue">
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {listaClientes.map((cliente) => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nome}</td>
                            <td>{cliente.email}</td>
                            <td>
                                <button 
                                    className="w3-button w3-blue w3-small"
                                    onClick={() => handleUpdate(cliente.id)}
                                >
                                    Atualizar
                                </button>
                                <button 
                                    className="w3-button w3-red w3-small"
                                    onClick={() => handleDelete(cliente.id)}
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
