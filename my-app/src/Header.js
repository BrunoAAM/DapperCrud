import React from "react";

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <a href="/" className="nav-item">
          Home
        </a>
        <a href="#" className="nav-item">
          Usuários
        </a>
        <a href="#" className="nav-item">
          Configurações
        </a>
      </nav>
      <p className="header-title">ADMIN PAGE</p>
    </header>
  );
}

export default Header;
