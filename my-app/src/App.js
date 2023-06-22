import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import UserTable from "./UserTable";
import UserProfile from "./UserProfile";
import CadastroUsuario from "./CadastroUsuario";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<UserTable />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/cadastro-usuario" element={<CadastroUsuario/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
