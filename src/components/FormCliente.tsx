import { useState, type ChangeEvent, type FormEvent } from "react";
import ClienteApiService from "../service/ClienteApiService";
import { alertApiError } from "../service/ApiErrorHelper";

export default function FormCliente() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");

    function cadastrarCliente(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        ClienteApiService.inserir({
            nome,
            email
        }).then(() => {
            alert(`Cliente ${nome} cadastrado com sucesso!`);
            setNome('');
            setEmail('');
        }).catch((err) => {
            alertApiError(err, 'Erro ao cadastrar cliente');
        });
    }

    return (
        <div className="w3-container w3-padding-16">
            <h2>Cadastro de Cliente</h2>
            <form onSubmit={cadastrarCliente} className="w3-container w3-card w3-padding">
                <p>
                    <label className="w3-text-blue"><b>Nome:</b></label>
                    <input 
                        className="w3-input w3-border" 
                        type="text" 
                        value={nome}
                        onChange={(ev: ChangeEvent<HTMLInputElement>) => setNome(ev.target.value)}
                        required 
                    />
                </p>
                <p>
                    <label className="w3-text-blue"><b>Email:</b></label>
                    <input 
                        className="w3-input w3-border" 
                        type="email" 
                        value={email}
                        onChange={(ev: ChangeEvent<HTMLInputElement>) => setEmail(ev.target.value)}
                        required 
                    />
                </p>
                <p>
                    <button type="submit" className="w3-button w3-blue">Salvar</button>
                </p>
            </form>
        </div>
    );
}
