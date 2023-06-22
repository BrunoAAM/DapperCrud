import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserTable.css";

function UserTable() {
  const [usuarios, setUsuarios] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    id: "asc",
    nome: "asc",
  });

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = () => {
    fetch("https://localhost:44364/api/usuarios")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao obter os usuários");
        }
        return response.json();
      })
      .then((data) => setUsuarios(data))
      .catch((error) => {
        console.error(error);
        // Aqui você pode definir um estado para indicar que ocorreu um erro
        // e mostrar uma mensagem de erro para o usuário
      });
  };

  const deletarUsuario = (id) => {
    fetch(`https://localhost:44364/api/usuarios/${id}`, { method: "delete" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao excluir o usuário");
        }
        return response.json();
      })
      .then((data) => {
        // Remover o usuário excluído do estado local
        setUsuarios((prevUsuarios) =>
          prevUsuarios.filter((usuario) => usuario.id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
        // Lidar com erros de exclusão aqui, se necessário
      });
  };
  const handleSort = (column) => {
    const newSortOrder = { ...sortOrder };
    newSortOrder[column] = newSortOrder[column] === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const sortedUsuarios = [...usuarios].sort((a, b) => {
      if (column === "id") {
        return newSortOrder[column] === "asc" ? a.id - b.id : b.id - a.id;
      } else if (column === "nome") {
        return newSortOrder[column] === "asc"
          ? a.nome.localeCompare(b.nome)
          : b.nome.localeCompare(a.nome);
      } else {
        return 0;
      }
    });

    setUsuarios(sortedUsuarios);
  };

  const getSortIcon = (column) => {
    if (sortOrder[column] === "asc") {
      return <i className="fas fa-sort-up"></i>;
    } else {
      return <i className="fas fa-sort-down"></i>;
    }
  };

  return (
    <div className="container">
      <h2>Lista de Usuários</h2>
      <Link to="/cadastro-usuario" className="btn-cadastrar-usuario">
        Cadastrar Usuário
      </Link>

      <table className="user-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>ID {getSortIcon("id")}</th>
            <th onClick={() => handleSort("nome")}>
              Nome {getSortIcon("nome")}
            </th>
            <th>CPF</th>
            <th>Celular</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.cpf}</td>
              <td>{usuario.contato?.celular}</td>
              <td>
                <Link
                  to={`/profile/${usuario.id}`}
                  className="action-link"
                  title="Editar"
                >
                  <i className="fas fa-pencil-alt"></i>
                </Link>
                <button
                  className="action-button"
                  title="Excluir"
                  onClick={() => deletarUsuario(usuario.id)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
