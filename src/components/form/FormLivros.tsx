import { useState, type ChangeEvent, type FormEvent } from "react";
import LivroApiService from "../../service/LivroApiService";
import { categorias } from "../data/categories/categories";
import { alertApiError } from "../../service/ApiErrorHelper";

export default function FormLivros() {
    const [nome, setNome] = useState("");
    const [autor, setAutor] = useState("");
    const [categoria, setCategoria] = useState("");

    function cadastrarLivro(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        LivroApiService.inserir({
            nome,
            autor,
            categoria
        }).then(() => {
            alert(`Livro ${nome} adicionado com sucesso!`);
            setNome('');
            setAutor('');
            setCategoria('');
        }).catch((err) => {
            alertApiError(err, 'Erro ao adicionar o livro');
        });
    }

    return (
        <div className="w3-container w3-padding-16">
            <h2>Cadastro de Livro</h2>
            <form onSubmit={cadastrarLivro} className="w3-container w3-card w3-padding">
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
                    <label className="w3-text-blue"><b>Autor:</b></label>
                    <input 
                        className="w3-input w3-border" 
                        type="text" 
                        value={autor}
                        onChange={(ev: ChangeEvent<HTMLInputElement>) => setAutor(ev.target.value)}
                        required 
                    />
                </p>
                <p>
                    <label className="w3-text-blue"><b>Categoria:</b></label>
                    <input 
                        className="w3-input w3-border" 
                        type="text" 
                        list="Categorias"
                        value={categoria}
                        onChange={(ev: ChangeEvent<HTMLInputElement>) => setCategoria(ev.target.value)}
                        required 
                    />  

                    <datalist id="Categorias">
                            {categorias.map((categoria) => (
                            <option key={categoria} value={categoria} />))}
                    </datalist>

                </p>
                <p>
                    <button type="submit" className="w3-button w3-blue">Salvar</button>
                </p>
            </form>
        </div>
    );
}