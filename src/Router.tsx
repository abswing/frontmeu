import { Route, Routes } from "react-router";
import App from "./App";
import Home from "./components/Home";
import ListLivros from "./components/ListLivros";
import FormLivros from "./components/FormLivros";
import ListClientes from "./components/ListClientes";
import FormCliente from "./components/FormCliente";
import ListRetiradas from "./components/ListRetiradas";
import FormRetirada from "./components/FormRetirada";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                
                {/* Rotas de Livros */}
                <Route path="/livros" element={<ListLivros />} />
                <Route path="/livros/cadastro" element={<FormLivros />} />
                
                {/* Rotas de Clientes */}
                <Route path="/clientes" element={<ListClientes />} />
                <Route path="/clientes/cadastro" element={<FormCliente />} />
                
                {/* Rotas de Retiradas */}
                <Route path="/retiradas" element={<ListRetiradas />} />
                <Route path="/retiradas/cadastro" element={<FormRetirada />} />
            </Route>
        </Routes>
    );
}