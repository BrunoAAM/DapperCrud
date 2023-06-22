import React, { useState } from "react";
import moment from "moment";
import "./CriarUsuario.css";

const CriarUsuario = () => {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    sexo: "",
    rg: "",
    cpf: "",
    nomeMae: "",
    situacaoCadastro: "",
    dataNascimento: "",
    dataCadastro: "",
    contato: {
      telefone: "",
      celular: "",
    },
    enderecosEntrega: [
      {
        nomeEndereco: "",
        cep: "",
        estado: "",
        cidade: "",
        bairro: "",
        endereco: "",
        numero: "",
        complemento: "",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };
  const handleContatoChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      contato: {
        ...prevUsuario.contato,
        [name]: value,
      },
    }));
  };

  const handleEnderecoChange = (e, index) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => {
      const enderecosEntrega = [...prevUsuario.enderecosEntrega];
      enderecosEntrega[index] = {
        ...enderecosEntrega[index],
        [name]: value,
      };
      return {
        ...prevUsuario,
        enderecosEntrega,
      };
    });
  };

  const addEndereco = () => {
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      enderecosEntrega: [
        ...prevUsuario.enderecosEntrega,
        {
          nomeEndereco: "",
          cep: "",
          estado: "",
          cidade: "",
          bairro: "",
          endereco: "",
          numero: "",
          complemento: "",
        },
      ],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Extrair valores do objeto de usuário
    const {
      nome,
      email,
      sexo,
      rg,
      cpf,
      nomeMae,
      situacaoCadastro,
      dataNascimento,
      dataCadastro,
      contato,
      enderecosEntrega,
    } = usuario;

    // Formatar a data de nascimento usando o Moment.js

    // Construir o objeto de usuário com os dados formatados
    const usuarioData = {
      nome,
      email,
      sexo,
      rg,
      cpf,
      nomeMae,
      situacaoCadastro,
      dataNascimento,
      dataCadastro,
      contato,
      enderecosEntrega,
    };

    // Envie o usuário para a API usando o fetch
    fetch("https://localhost:44364/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuarioData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Usuário cadastrado com sucesso:", data);
        setUsuario({
          nome: '',
          email: '',
          sexo: '',
          rg: '',
          cpf: '',
          nomeMae: '',
          situacaoCadastro: '',
          dataNascimento: '',
          dataCadastro: '',
          contato: {
            telefone: '',
            celular: ''
          },
          enderecosEntrega: [{
            nomeEndereco: '',
            cep: '',
            estado: '',
            cidade: '',
            bairro: '',
            endereco: '',
            numero: '',
            complemento: ''
          }]
        });
      })
      .catch((error) => {
        console.error("Erro ao cadastrar usuário:", error);
        // Trate o erro de acordo com as necessidades do seu aplicativo
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
        <h2 className="form-section">Dados Cadastrais</h2>
      <div className="form-group">
        <label htmlFor="nome" className="form-label">
          Nome:
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={usuario.nome}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={usuario.email}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="sexo" className="form-label">
          Sexo:
        </label>
        <input
          type="text"
          id="sexo"
          name="sexo"
          value={usuario.sexo}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="rg" className="form-label">
          RG:
        </label>
        <input
          type="text"
          id="rg"
          name="rg"
          value={usuario.rg}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="cpf" className="form-label">
          CPF:
        </label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          value={usuario.cpf}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="nomeMae" className="form-label">
          Nome da Mãe:
        </label>
        <input
          type="text"
          id="nomeMae"
          name="nomeMae"
          value={usuario.nomeMae}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="situacaoCadastro" className="form-label">
          Situação de Cadastro:
        </label>
        <input
          type="text"
          id="situacaoCadastro"
          name="situacaoCadastro"
          value={usuario.situacaoCadastro}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="dataNascimento" className="form-label">
          Data de Nascimento:
        </label>
        <input
          type="date"
          id="dataNascimento"
          name="dataNascimento"
          value={usuario.dataNascimento}
          onChange={handleChange}
          max="9999-12-31"
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="dataCadastro" className="form-label">
          Data de Cadastro:
        </label>
        <input
          type="date"
          id="dataCadastro"
          name="dataCadastro"
          value={usuario.dataCadastro}
          onChange={handleChange}
          max="9999-12-31"
          className="form-input"
        />
      </div>
      <h2 className="form-section">Contato</h2>
      <div className="form-group">
        <label htmlFor="telefone" className="form-label">
          Telefone:
        </label>
        <input
          type="text"
          id="telefone"
          name="telefone"
          value={usuario.contato.telefone}
          onChange={handleContatoChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="celular" className="form-label">
          Celular:
        </label>
        <input
          type="text"
          id="celular"
          name="celular"
          value={usuario.contato.celular}
          onChange={handleContatoChange}
          className="form-input"
        />
      </div>
      <h2 className="form-section">Endereços de Entrega</h2>
      {usuario.enderecosEntrega.map((endereco, index) => (
        <div key={index}>
          <div className="form-group">
            <label htmlFor={`nomeEndereco${index}`} className="form-label">
              Nome do Endereço:
            </label>
            <input
              type="text"
              id={`nomeEndereco${index}`}
              name="nomeEndereco"
              value={endereco.nomeEndereco}
              onChange={(e) => handleEnderecoChange(e, index)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor={`cep${index}`} className="form-label">
              CEP:
            </label>
            <input
              type="text"
              id={`cep${index}`}
              name="cep"
              value={endereco.cep}
              onChange={(e) => handleEnderecoChange(e, index)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor={`estado${index}`} className="form-label">
              Estado:
            </label>
            <input
              type="text"
              id={`estado${index}`}
              name="estado"
              value={endereco.estado}
              onChange={(e) => handleEnderecoChange(e, index)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor={`cidade${index}`} className="form-label">
              Cidade:
            </label>
            <input
              type="text"
              id={`cidade${index}`}
              name="cidade"
              value={endereco.cidade}
              onChange={(e) => handleEnderecoChange(e, index)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor={`bairro${index}`} className="form-label">
              Bairro:
            </label>
            <input
              type="text"
              id={`bairro${index}`}
              name="bairro"
              value={endereco.bairro}
              onChange={(e) => handleEnderecoChange(e, index)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor={`endereco${index}`} className="form-label">
              Endereço:
            </label>
            <input
              type="text"
              id={`endereco${index}`}
              name="endereco"
              value={endereco.endereco}
              onChange={(e) => handleEnderecoChange(e, index)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor={`numero${index}`} className="form-label">
              Número:
            </label>
            <input
              type="text"
              id={`numero${index}`}
              name="numero"
              value={endereco.numero}
              onChange={(e) => handleEnderecoChange(e, index)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor={`complemento${index}`} className="form-label">
              Complemento:
            </label>
            <input
              type="text"
              id={`complemento${index}`}
              name="complemento"
              value={endereco.complemento}
              onChange={(e) => handleEnderecoChange(e, index)}
              className="form-input"
            />
          </div>
        </div>
      ))}
      <button type="button" onClick={addEndereco} className="add-endereco-btn">
        Adicionar Endereço
      </button>
      <button type="submit" className="submit-btn">
        Enviar
      </button>
    </form>
  );
};

export default CriarUsuario;
