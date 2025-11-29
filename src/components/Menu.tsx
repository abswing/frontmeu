import { useState } from "react";
import { Link } from "react-router";

export default function Menu() {

    const classMenuMobile = "w3-bar-block w3-large w3-black w3-hide w3-hide-large w3-hide-medium";

    const [selecionado, setSelecionado] = useState(false);

    const onClickMenu = () => {
        setSelecionado(!selecionado);
    }
    return (
        <div className="w3-top w3-margin-botton">
            <nav className="w3-bar w3-large w3-black">
                <a className="w3-bar-item w3-button w3-hide-large w3-hide-medium" onClick={onClickMenu}>&#9776;</a>
                <Link to="/" className="w3-bar-item w3-button">
                    <i className="fa fa-home w3-xlarge"></i>
                </Link>
                
                <Link to="/" className="w3-bar-item w3-button w3-hide-small">Home</Link>
                
                <Link to="/livros" className="w3-bar-item w3-button w3-hide-small">Livros</Link>
                <Link to="/livros/cadastro" className="w3-bar-item w3-button w3-hide-small">Cadastrar Livro</Link>
                
                <Link to="/clientes" className="w3-bar-item w3-button w3-hide-small">Clientes</Link>
                <Link to="/clientes/cadastro" className="w3-bar-item w3-button w3-hide-small">Cadastrar Cliente</Link>
                
                <Link to="/retiradas" className="w3-bar-item w3-button w3-hide-small">Retiradas</Link>
                <Link to="/retiradas/cadastro" className="w3-bar-item w3-button w3-hide-small">Nova Retirada</Link>
                
                <a href="#" className="w3-bar-item w3-button w3-right">
                    <i className="fa fa-search w3-xlarge"></i>
                </a>
            </nav>
            <nav id="menu-mobile" className={classMenuMobile + ((selecionado) ?" w3-show" :"")}>
                <Link to="/" className="w3-bar-item w3-button">Home</Link>
                <Link to="/livros" className="w3-bar-item w3-button">Livros</Link>
                <Link to="/clientes" className="w3-bar-item w3-button">Clientes</Link>
                <Link to="/retiradas" className="w3-bar-item w3-button">Retiradas</Link>
            </nav>
        </div>
    )
}