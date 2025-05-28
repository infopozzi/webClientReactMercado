import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Formulário</Link></li>
        <li><Link to="/lista-produtos">Lista Produtos</Link></li>
        <li><Link to="/pedido">Pedido</Link></li>
        <li><Link to="/login">Login/Logout</Link></li>
      </ul>
    </nav>
  );
}

export default Menu;
