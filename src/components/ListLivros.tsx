import { useEffect, useState } from "react";
import LivroApiService from "../service/LivroApiService";
import type { Livro } from "../types";
import { alertApiError } from "../service/ApiErrorHelper";

export default function ListCardLivros() {
    const [listaLivros, setListaLivros] = useState<Livro[]>([]);

    useEffect(() => {
        LivroApiService.listar()
            .then(livros => setListaLivros(livros))
            .catch(err => alertApiError(err, 'Falha ao carregar livros'));
    }, []);


    const handleUpdate = (id: number) => {
        if (confirm("Deseja realmente atualizar este livro?")) {
            const livro = listaLivros.find(c => c.id === id);
            if (!livro) return;

            // pede novos valores ao usuário (ou cancele)
            const nome = prompt("Nome:", livro.nome);
            if (nome === null) return;
            const autor = prompt("Autor:", livro.autor);
            if (autor === null) return;

            const atualizado: Livro = { ...livro, nome, autor };

            LivroApiService.atualizar(id.toString(), atualizado)
                .then(() => {
                    setListaLivros(prev => prev.map(c => c.id === id ? atualizado : c));
                    alert("Livro atualizado com sucesso!");
                })
                .catch(err => alertApiError(err, 'Erro ao atualizar livro'));
        }
    };

    const handleDelete = (id: number) => {
            if (confirm("Deseja realmente excluir este livro?")) {
                LivroApiService.deletar(id.toString())
                    .then(() => {
                        setListaLivros(listaLivros.filter(c => c.id !== id));
                        alert("Livro excluído com sucesso!");
                    })
                    .catch(err => alertApiError(err, 'Erro ao excluir livro'));
            }
        };

        return (
        <div className="w3-container w3-padding-16">
            <h2>Lista de Livros</h2>
            <table className="w3-table w3-striped w3-bordered">
                <thead>
                    <tr className="w3-blue">
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Autor</th>
                        <th>Categoria</th>
                        <th>Disponível</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {listaLivros.map((livro) => (
                        <tr key={livro.id}>
                            <td>{livro.id}</td>
                            <td>{livro.nome}</td>
                            <td>{livro.autor}</td>
                            <td>{livro.categoria}</td>
                            <td>
                                <span className={livro.disponivel ? "w3-tag w3-green" : "w3-tag w3-red"}>
                                    {livro.disponivel ? "Disponível" : "Locado"}
                                </span>
                            </td>
                            <td>
                                <button 
                                    className="w3-button w3-blue w3-small"
                                    onClick={() => handleUpdate(livro.id)}
                                >
                                    Atualizar
                                </button>
                                <button 
                                    className="w3-button w3-red w3-small"
                                    onClick={() => handleDelete(livro.id)}
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
