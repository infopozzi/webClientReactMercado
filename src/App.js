import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CadastroProduto from './componentes/CadastroProduto';
import Formulario from './componentes/Formulario';
import ListaProdutos from './componentes/ListaProdutos';
import EditarProduto from './componentes/EditarProduto'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/cadastro-produto" element={<CadastroProduto />} />
        <Route path="/lista-produtos" element={<ListaProdutos />} />
        <Route path="/editar-produto/:id" element={<EditarProduto />} /> 
      </Routes>
    </Router>
  );
}

export default App;
