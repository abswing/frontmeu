import { useEffect, useState } from "react";
import RetiradaApiService from "../service/RetiradaApiService";
import ClienteApiService from "../service/ClienteApiService";
import LivroApiService from "../service/LivroApiService";
import type { Retirada, Cliente, Livro } from "../types";
import { alertApiError } from "../service/ApiErrorHelper";

export default function ListRetiradas() {
    // Estados
    const [listaRetiradas, setListaRetiradas] = useState<Retirada[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [livros, setLivros] = useState<Livro[]>([]);
    const [expandedId, setExpandedId] = useState<number | null>(null);

    // Carrega dados ao inicializar
    useEffect(() => {
        RetiradaApiService.listar()
            .then(retiradas => setListaRetiradas(retiradas))
            .catch(err => alertApiError(err, 'Falha ao carregar retiradas'));
        
        ClienteApiService.listar()
            .then(clientes => setClientes(clientes))
            .catch(err => alertApiError(err, 'Falha ao carregar clientes'));
        
        LivroApiService.listar()
            .then(livros => setLivros(livros))
            .catch(err => alertApiError(err, 'Falha ao carregar livros'));
    }, []);

    // Funções auxiliares
    const formatDate = (date: Date | string) => {
        return new Date(date).toLocaleDateString('pt-BR');
    };

    const getClienteNome = (clienteid: number) => {
        const cliente = clientes.find(c => c.id === clienteid);
        return cliente ? cliente.nome : `ID: ${clienteid}`;
    };

    const getLivroNome = (livroid: number) => {
        const livro = livros.find(l => l.id === livroid);
        return livro ? livro.nome : `ID: ${livroid}`;
    };

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    // Handlers
    const handleDevolverRetirada = (id: number) => {
        if (!confirm("Deseja realmente devolver este livro?")) return;

        RetiradaApiService.devolverLivro(id.toString())
            .then(() => {
                setListaRetiradas(prev => 
                    prev.map(r => r.id === id 
                        ? { ...r, datadevolucaoreal: new Date().toISOString() } 
                        : r
                    )
                );
                alert("Livro devolvido com sucesso!");
            })
            .catch(err => alertApiError(err, 'Erro ao devolver livro'));
    };

    return (
        <div className="w3-container w3-padding-16">
            <h2>Lista de Retiradas</h2>
            <table className="w3-table w3-striped w3-bordered">
                <thead>
                    <tr className="w3-blue">
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Livro</th>
                        <th>Data Retirada</th>
                        <th>Data Devolução Prevista</th>
                        <th>Data Devolução Real</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {listaRetiradas.map((retirada) => {
                        const isDevolvido = !!retirada.datadevolucaoreal;
                        const isExpanded = expandedId === retirada.id;
                        
                        return (
                            <>
                                <tr key={retirada.id}>
                                    <td>
                                        <button 
                                            className="w3-button w3-small"
                                            onClick={() => toggleExpand(retirada.id)}
                                        >
                                            {isExpanded ? '▼' : '►'}
                                        </button>
                                        {retirada.id}
                                    </td>
                                    <td>{getClienteNome(retirada.clienteid)}</td>
                                    <td>{getLivroNome(retirada.livroid)}</td>
                                    <td>{formatDate(retirada.dataretirada)}</td>
                                    <td>{formatDate(retirada.datadevolucao)}</td>
                                    <td>
                                        {isDevolvido ? formatDate(retirada.datadevolucaoreal!) : '-'}
                                    </td>
                                    <td>
                                        <button 
                                            className={`w3-button ${isDevolvido ? 'w3-green' : 'w3-blue'}`}
                                            onClick={isDevolvido ? undefined : () => handleDevolverRetirada(retirada.id)}
                                            style={isDevolvido ? { cursor: 'not-allowed' } : {}}
                                        >
                                            {isDevolvido ? "Devolvido" : "Devolver"}
                                        </button>
                                    </td>
                                </tr>
                                
                                {isExpanded && (
                                    <tr>
                                        <td colSpan={7} className="w3-light-grey">
                                            <div className="w3-container w3-padding">
                                                <h4>Detalhes da Retirada #{retirada.id}</h4>
                                                
                                                <p><strong>Cliente:</strong> {getClienteNome(retirada.clienteid)}</p>
                                                <p><strong>Livro:</strong> {getLivroNome(retirada.livroid)}</p>
                                                <p><strong>Data de Retirada:</strong> {formatDate(retirada.dataretirada)}</p>
                                                <p><strong>Data de Devolução Prevista:</strong> {formatDate(retirada.datadevolucao)}</p>
                                                <p>
                                                    <strong>Data de Devolução Real:</strong> {' '}
                                                    {isDevolvido ? formatDate(retirada.datadevolucaoreal!) : 'Ainda não devolvido'}
                                                </p>
                                                <p>
                                                    <strong>Status:</strong> {' '}
                                                    <span className={`w3-tag ${isDevolvido ? 'w3-green' : 'w3-orange'}`}>
                                                        {isDevolvido ? 'Devolvido' : 'Pendente'}
                                                    </span>
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
