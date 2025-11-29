import { Outlet } from "react-router"

import Menu from "./components/Menu"

function App() {

  return (
    <>
      <Menu></Menu>
      <main>
        <div className="w3-container w3-padding-16 w3-margin-top">
          <h1>Minha Petshop</h1>
        </div>

        <div className="w3-row w3-container w3-margin-top">
          <Outlet></Outlet>
        </div>
      </main>

      <footer className="w3-container w3-margin-top w3-black ">
        <p className="w3-center">Realizado por Ries (imagens retiradas de cultura.com.br)</p>
      </footer>

    </>
  )
}

export default App