import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import RetiradaApiService from "../service/RetiradaApiService";
import ClienteApiService from "../service/ClienteApiService";
import LivroApiService from "../service/LivroApiService";
import type { Cliente, Livro } from "../types";
import { alertApiError } from "../service/ApiErrorHelper";

export default function FormRetirada() {
    const [clienteid, setClienteid] = useState("");
    const [livroid, setLivroid] = useState("");
    
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [livros, setLivros] = useState<Livro[]>([]);

    useEffect(() => {
        ClienteApiService.listar().then(setClientes).catch(err => alertApiError(err, 'Falha ao carregar clientes'));
        LivroApiService.listar().then(setLivros).catch(err => alertApiError(err, 'Falha ao carregar livros'));
    }, []);

    function cadastrarRetirada(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        RetiradaApiService.registrarRetirada({
            clienteid: parseInt(clienteid),
            livroid: parseInt(livroid),
        }).then(() => {
            alert('Retirada registrada com sucesso!');
            setClienteid('');
            setLivroid('');
        }).catch((err) => {
            alertApiError(err, 'Erro ao registrar retirada');
        });
    }

    return (
        <div className="w3-container w3-padding-16">
            <h2>Registrar Retirada</h2>
            <form onSubmit={cadastrarRetirada} className="w3-container w3-card w3-padding">
                <p>
                    <label className="w3-text-blue"><b>Cliente:</b></label>
                    <select 
                        className="w3-select w3-border" 
                        value={clienteid}
                        onChange={(ev: ChangeEvent<HTMLSelectElement>) => setClienteid(ev.target.value)}
                        required
                    >
                        <option value="">Selecione um cliente</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nome} - {cliente.email}
                            </option>
                        ))}
                    </select>
                </p>
                <p>
                    <label className="w3-text-blue"><b>Livro:</b></label>
                    <select 
                        className="w3-select w3-border" 
                        value={livroid}
                        onChange={(ev: ChangeEvent<HTMLSelectElement>) => setLivroid(ev.target.value)}
                        required
                    >
                        <option value="">Selecione um livro</option>
                        {livros.map(livro => (
                            <option key={livro.id} value={livro.id}>
                                {livro.nome} - {livro.autor}
                            </option>
                        ))}
                    </select>
                </p>                
                <p>
                    <button type="submit" className="w3-button w3-blue">Registrar</button>
                </p>
            </form>
        </div>
    );
}
