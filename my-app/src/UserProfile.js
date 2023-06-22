import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./UserProfile.css";

function UserProfile() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [usuarioEditado, setUsuarioEditado] = useState(null);

  useEffect(() => {
    fetchUsuario(id);
  }, [id]);

  const fetchUsuario = (id) => {
    fetch(`https://localhost:44364/api/usuarios/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao obter o usuário");
        }
        return response.json();
      })
      .then((data) => {
        setUsuario(data);
        setUsuarioEditado(data);
      })
      .catch((error) => {
        console.error(error);
        // Aqui você pode definir um estado para indicar que ocorreu um erro
        // e mostrar uma mensagem de erro para o usuário
      });
  };

  const handleEditarClick = () => {
    setModoEdicao(true);
  };

  const handleSalvarClick = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuarioEditado),
    };

    fetch(`https://localhost:44364/api/usuarios`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao atualizar o usuário");
        }
        setModoEdicao(false);
        fetchUsuario(id); // Atualiza os dados do usuário após a atualização
      })
      .catch((error) => {
        console.error(error);
        // Aqui você pode definir um estado para indicar que ocorreu um erro
        // e mostrar uma mensagem de erro para o usuário
      });
  };
  const handleCancelarClick = () => {
    setModoEdicao(false);
    setUsuarioEditado(usuario);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUsuarioEditado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChangeContato = (event) => {
    const { name, value } = event.target;
    setUsuarioEditado((prevState) => ({
      ...prevState,
      contato: {
        ...prevState.contato,
        [name]: value,
      },
    }));
  };

  const handleInputChangeEndereco = (event, index) => {
    const { name, value } = event.target;
    const enderecosAtualizados = usuarioEditado.enderecosEntrega.map(
      (endereco, i) => {
        if (i === index) {
          return {
            ...endereco,
            [name.split(".")[1]]: value,
          };
        }
        return endereco;
      }
    );

    setUsuarioEditado((prevState) => ({
      ...prevState,
      enderecosEntrega: enderecosAtualizados,
    }));
  };
  const handleInputChangeDepartamento = (event, index) => {
    const { name, value } = event.target;
    const departamentosAtualizados = [...usuarioEditado.departamentos];
    departamentosAtualizados[index] = {
      ...departamentosAtualizados[index],
      name: value,
    };
    setUsuarioEditado((prevState) => ({
      ...prevState,
      departamentos: departamentosAtualizados,
    }));
  };

  if (!usuario) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="user-profile-container">
      <h2 className="user-profile-title">Detalhes do Usuário</h2>
      <form className="user-profile-form">
        <div className="user-info-section">
          <div>
            <label className="user-profile-label">ID:</label>
            <input
              className="user-profile-input"
              type="text"
              value={usuarioEditado?.id}
              disabled={!modoEdicao}
              onChange={handleInputChange}
              name="id"
            />
          </div>
          <div>
            <label className="user-profile-label">Nome:</label>
            <input
              className="user-profile-input"
              type="text"
              value={usuarioEditado?.nome}
              disabled={!modoEdicao}
              onChange={handleInputChange}
              name="nome"
            />
          </div>
          <div>
            <label className="user-profile-label">Email:</label>
            <input
              className="user-profile-input"
              type="text"
              value={usuarioEditado?.email}
              disabled={!modoEdicao}
              onChange={handleInputChange}
              name="email"
            />
          </div>
          <div>
            <label className="user-profile-label">Sexo:</label>
            <input
              className="user-profile-input"
              type="text"
              value={usuarioEditado?.sexo}
              disabled={!modoEdicao}
              onChange={handleInputChange}
              name="sexo"
            />
          </div>
          <div>
            <label className="user-profile-label">RG:</label>
            <input
              className="user-profile-input"
              type="text"
              value={usuarioEditado?.rg}
              disabled={!modoEdicao}
              onChange={handleInputChange}
              name="rg"
            />
          </div>
          <div>
            <label className="user-profile-label">CPF:</label>
            <input
              className="user-profile-input"
              type="text"
              value={usuarioEditado?.cpf}
              disabled={!modoEdicao}
              onChange={handleInputChange}
              name="cpf"
            />
          </div>
          <div>
            <label className="user-profile-label">Nome da mãe:</label>
            <input
              className="user-profile-input"
              type="text"
              value={usuarioEditado?.nomeMae}
              disabled={!modoEdicao}
              onChange={handleInputChange}
              name="nomeMae"
            />
          </div>
          <div>
            <label className="user-profile-label">Situação do cadastro:</label>
            <input
              className="user-profile-input"
              type="text"
              value={usuarioEditado?.situacaoCadastro}
              disabled={!modoEdicao}
              onChange={handleInputChange}
              name="situacaoCadastro"
            />
          </div>
          <div>
            <label className="user-profile-label">Data de nascimento:</label>
            <input
              className="user-profile-input"
              type="text"
              value={usuarioEditado?.dataNascimento}
              disabled={!modoEdicao}
              onChange={handleInputChange}
              name="dataNascimento"
            />
          </div>
          <div>
            <label className="user-profile-label">Data de cadastro:</label>
            <input
              className="user-profile-input"
              type="text"
              value={usuarioEditado?.dataCadastro}
              disabled={!modoEdicao}
              onChange={handleInputChange}
              name="dataCadastro"
            />
          </div>
          <div>
            <label className="user-profile-label">Telefone:</label>
            <input
              className="user-profile-input"
              type="text"
              value={usuarioEditado?.contato?.telefone || ""}
              disabled={!modoEdicao}
              onChange={handleInputChangeContato}
              name="telefone"
            />
          </div>
          <div>
            <label className="user-profile-label">Celular:</label>
            <input
              className="user-profile-input"
              type="text"
              value={usuarioEditado?.contato?.celular || ""}
              disabled={!modoEdicao}
              onChange={handleInputChangeContato}
              name="celular"
            />
          </div>
        </div>
        <div className="endereco-entrega-section">
          <h3>Endereços de Entrega</h3>
          {usuarioEditado.enderecosEntrega.map((endereco, index) => (
            <div key={endereco?.id}>
              <h4>Endereço {index + 1}</h4>
              <div className="endereco-item">
                <div>
                  <label className="user-profile-label" >Nome do Endereço:</label>
                  <input
                  className="user-profile-input"
                    type="text"
                    value={endereco?.nomeEndereco}
                    disabled={!modoEdicao}
                    onChange={(event) =>
                      handleInputChangeEndereco(event, index)
                    }
                    name={`enderecosEntrega[${index}].nomeEndereco`}
                  />
                </div>
                <div>
                  <label className="user-profile-label">CEP:</label>
                  <input
                  className="user-profile-input"
                    type="text"
                    value={endereco?.cep}
                    disabled={!modoEdicao}
                    onChange={(event) =>
                      handleInputChangeEndereco(event, index)
                    }
                    name={`enderecosEntrega[${index}].cep`}
                  />
                </div>
                <div>
                  <label className="user-profile-label">Estado:</label>
                  <input
                  className="user-profile-input"
                    type="text"
                    value={endereco?.estado}
                    disabled={!modoEdicao}
                    onChange={(event) =>
                      handleInputChangeEndereco(event, index)
                    }
                    name={`enderecosEntrega[${index}].estado`}
                  />
                </div>
                <div>
                  <label className="user-profile-label">Cidade:</label>
                  <input
                  className="user-profile-input"
                    type="text"
                    value={endereco?.cidade}
                    disabled={!modoEdicao}
                    onChange={(event) =>
                      handleInputChangeEndereco(event, index)
                    }
                    name={`enderecosEntrega[${index}].cidade`}
                  />
                </div>
                <div>
                  <label className="user-profile-label">Bairro:</label>
                  <input
                  className="user-profile-input"
                    type="text"
                    value={endereco?.bairro}
                    disabled={!modoEdicao}
                    onChange={(event) =>
                      handleInputChangeEndereco(event, index)
                    }
                    name={`enderecosEntrega[${index}].bairro`}
                  />
                </div>
                <div>
                  <label className="user-profile-label">Endereço:</label>
                  <input
                  className="user-profile-input"
                    type="text"
                    value={endereco?.endereco}
                    disabled={!modoEdicao}
                    onChange={(event) =>
                      handleInputChangeEndereco(event, index)
                    }
                    name={`enderecosEntrega[${index}].endereco`}
                  />
                </div>
                <div>
                  <label className="user-profile-label">Número:</label>
                  <input
                  className="user-profile-input"
                    type="text"
                    value={endereco?.numero}
                    disabled={!modoEdicao}
                    onChange={(event) =>
                      handleInputChangeEndereco(event, index)
                    }
                    name={`enderecosEntrega[${index}].numero`}
                  />
                </div>
                <div>
                  <label className="user-profile-label">Complemento:</label>
                  <input
                  className="user-profile-input"
                    type="text"
                    value={endereco?.complemento}
                    disabled={!modoEdicao}
                    onChange={(event) =>
                      handleInputChangeEndereco(event, index)
                    }
                    name={`enderecosEntrega[${index}].complemento`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="department-section">
          <label className="user-profile-label">Departamentos:</label>
          <div>
            {usuarioEditado.departamentos.map((departamento, index) => (
              <input
                className="user-profile-input"
                type="text"
                value={departamento?.nome}
                disabled={!modoEdicao}
                key={departamento?.id}
                onChange={(event) =>
                  handleInputChangeDepartamento(event, index)
                }
                name={`departamentos[${index}].nome`}
              />
            ))}
          </div>
        </div>
        <div className="button-row">
          {modoEdicao ? (
            <>
              <button
                className="save-button"
                type="button"
                onClick={handleSalvarClick}
              >
                Salvar
              </button>
              <button
                className="cancel-button"
                type="button"
                onClick={handleCancelarClick}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              className="edit-button"
              type="button"
              onClick={handleEditarClick}
            >
              Editar
            </button>
          )}
          <Link to="/" className="back-link">
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}

export default UserProfile;
