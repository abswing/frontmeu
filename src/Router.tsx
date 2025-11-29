import { Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import ListLivros from "./components/list/ListLivros";
import FormLivros from "./components/form/FormLivros";
import ListClientes from "./components/list/ListClientes";
import FormCliente from "./components/form/FormCliente";
import ListRetiradas from "./components/list/ListRetiradas";
import FormRetirada from "./components/form/FormRetirada";

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