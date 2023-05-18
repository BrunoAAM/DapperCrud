using System.Data;
using System.Data.SqlClient;
using System.Xml;
using eCommerce.API.Models;
using Dapper;
using System.Transactions;
using System.Data.Common;
using static System.Net.Mime.MediaTypeNames;

namespace eCommerce.API.Repositories {
    public class UsuarioRepository : IUsuarioRepository {

        private IDbConnection _connection;

        public UsuarioRepository() {
            _connection = new SqlConnection("Data Source=DESKTOP-4PQ9JQH;Initial Catalog=eCommerce;Integrated Security=True;Connect Timeout=30;Encrypt=False");
        }

        public List<Usuario> Get() {
            //return _connection.Query<Usuario>("SELECT * FROM Usuarios").ToList();
            List<Usuario> usuarios = new List<Usuario>();
            string sql = "SELECT U.*, C.*, EE.*, D.* FROM Usuarios as U LEFT JOIN Contatos C ON C.UsuarioId = U.Id LEFT JOIN EnderecosEntrega EE ON EE.UsuarioId = U.Id LEFT JOIN UsuariosDepartamentos UD ON UD.UsuarioId = U.Id LEFT JOIN Departamentos D ON UD.DepartamentoId = D.Id";

            _connection.Query<Usuario, Contato, EnderecoEntrega, Departamento, Usuario>(sql,
                (usuario, contato, enderecoEntrega, departamento) => {

                    //Verificação do usuário.
                    if (usuarios.SingleOrDefault(a => a.Id == usuario.Id) == null) {
                        usuario.Departamentos = new List<Departamento>();
                        usuario.EnderecosEntrega = new List<EnderecoEntrega>();
                        usuario.Contato = contato;
                        usuarios.Add(usuario);
                    }
                    else {
                        usuario = usuarios.SingleOrDefault(a => a.Id == usuario.Id);
                    }

                    //Verificação do Endereço de Entrega.
                    if (usuario.EnderecosEntrega.SingleOrDefault(a => a.Id == enderecoEntrega.Id) == null) {
                        usuario.EnderecosEntrega.Add(enderecoEntrega);
                    }

                    //Verificação do Departamento.
                    if (usuario.Departamentos.SingleOrDefault(a => a.Id == departamento.Id) == null) {
                        usuario.Departamentos.Add(departamento);
                    }

                    return usuario;
                });

            return usuarios;
        }

        public List<Usuario> GetUsuariosMaioresDe18() {
            List<Usuario> usuariosMaioresDe18 = new List<Usuario>();
            string sql = "SELECT U.*, C.*, EE.*, D.* FROM Usuarios as U LEFT JOIN Contatos C ON C.UsuarioId = U.Id LEFT JOIN EnderecosEntrega EE ON EE.UsuarioId = U.Id LEFT JOIN UsuariosDepartamentos UD ON UD.UsuarioId = U.Id LEFT JOIN Departamentos D ON UD.DepartamentoId = D.Id WHERE U.DataNascimento <= DATEADD(year, -18, GETDATE())";

            _connection.Query<Usuario, Contato, EnderecoEntrega, Departamento, Usuario>(sql,
                (usuario, contato, enderecoEntrega, departamento) => {

                    //Verificação do usuário.
                    if (usuariosMaioresDe18.SingleOrDefault(a => a.Id == usuario.Id) == null) {
                        usuario.Departamentos = new List<Departamento>();
                        usuario.EnderecosEntrega = new List<EnderecoEntrega>();
                        usuario.Contato = contato;
                        usuariosMaioresDe18.Add(usuario);
                    }
                    else {
                        usuario = usuariosMaioresDe18.SingleOrDefault(a => a.Id == usuario.Id);
                    }

                    //Verificação do Endereço de Entrega.
                    if (usuario.EnderecosEntrega.SingleOrDefault(a => a.Id == enderecoEntrega.Id) == null) {
                        usuario.EnderecosEntrega.Add(enderecoEntrega);
                    }

                    //Verificação do Departamento.
                    if (usuario.Departamentos.SingleOrDefault(a => a.Id == departamento.Id) == null) {
                        usuario.Departamentos.Add(departamento);
                    }

                    return usuario;
                });

            return usuariosMaioresDe18;
        }

        public Usuario Get(int id) {
            List<Usuario> usuarios = new List<Usuario>();
            string sql = "SELECT U.*, C.*, EE.*, D.* FROM Usuarios as U LEFT JOIN Contatos C ON C.UsuarioId = U.Id LEFT JOIN EnderecosEntrega EE ON EE.UsuarioId = U.Id LEFT JOIN UsuariosDepartamentos UD ON UD.UsuarioId = U.Id LEFT JOIN Departamentos D ON UD.DepartamentoId = D.Id WHERE U.Id = @Id";

            _connection.Query<Usuario, Contato, EnderecoEntrega, Departamento, Usuario>(sql,
                (usuario, contato, enderecoEntrega, departamento) => {

                    //Verificação do usuário.
                    if (usuarios.SingleOrDefault(a => a.Id == usuario.Id) == null) {
                        usuario.Departamentos = new List<Departamento>();
                        usuario.EnderecosEntrega = new List<EnderecoEntrega>();
                        usuario.Contato = contato;
                        usuarios.Add(usuario);
                    }
                    else {
                        usuario = usuarios.SingleOrDefault(a => a.Id == usuario.Id);
                    }

                    //Verificação do Endereço de Entrega.
                    if (usuario.EnderecosEntrega.SingleOrDefault(a => a.Id == enderecoEntrega.Id) == null) {
                        usuario.EnderecosEntrega.Add(enderecoEntrega);
                    }

                    //Verificação do Departamento.
                    if (usuario.Departamentos == null) {
                        usuario.Departamentos = new List<Departamento>();
                    }
                    if (usuario.Departamentos.FirstOrDefault(a => a.Id == departamento.Id) == null) {
                        usuario.Departamentos.Add(departamento);
                    }

                    return usuario;
                }, new { Id = id });

            return usuarios.SingleOrDefault();
        }


        public object GetMaiorDeIdade(int id) {
            List<Usuario> usuarios = new List<Usuario>();
            string sql = "SELECT U.*, C.*, EE.*, D.* FROM Usuarios as U LEFT JOIN Contatos C ON C.UsuarioId = U.Id LEFT JOIN EnderecosEntrega EE ON EE.UsuarioId = U.Id LEFT JOIN UsuariosDepartamentos UD ON UD.UsuarioId = U.Id LEFT JOIN Departamentos D ON UD.DepartamentoId = D.Id WHERE U.Id = @Id";

            var resultado =   _connection.Query<Usuario, Contato, EnderecoEntrega, Departamento, Usuario>(sql,
                (usuario, contato, enderecoEntrega, departamento) => {

                    //Verificação do usuário.
                    if (usuarios.SingleOrDefault(a => a.Id == usuario.Id) == null) {
                        usuario.Departamentos = new List<Departamento>();
                        usuario.EnderecosEntrega = new List<EnderecoEntrega>();
                        usuario.Contato = contato;
                        usuarios.Add(usuario);
                    }
                    else {
                        usuario = usuarios.SingleOrDefault(a => a.Id == usuario.Id);
                    }

                    //Verificação do Endereço de Entrega.
                    if (usuario.EnderecosEntrega.SingleOrDefault(a => a.Id == enderecoEntrega.Id) == null) {
                        usuario.EnderecosEntrega.Add(enderecoEntrega);
                    }

                    //Verificação do Departamento.
                    if (usuario.Departamentos == null) {
                        usuario.Departamentos = new List<Departamento>();
                    }
                    if (usuario.Departamentos.FirstOrDefault(a => a.Id == departamento.Id) == null) {
                        usuario.Departamentos.Add(departamento);
                    }

                    return usuario;
                }, new { Id = id });
                int idade =0;
            var usuario = resultado.FirstOrDefault();
            if (usuario != null) {
                DateTime dataAtual = DateTime.Now;
                DateTime dataNascimento = usuario.DataNascimento;
                 idade = dataAtual.Year - dataNascimento.Year;
                if (dataAtual < dataNascimento.AddYears(idade)) {
                    idade--;
                }

                if (idade < 18) {
                    return $"O usuario '{usuario.Nome}' não é maior de idade. Ele têm {idade} anos de idade";
                }
            }

            return $"O usuario '{usuario.Nome}' é maior de idade. Ele têm {idade} anos de idade";
        }


        public void Insert(Usuario usuario) {
            _connection.Open();
            var transaction = _connection.BeginTransaction();
            try {
                string sql = "INSERT INTO Usuarios(Nome, Email, Sexo, RG, CPF, NomeMae, SituacaoCadastro, DataCadastro, DataNascimento) VALUES (@Nome, @Email, @Sexo, @RG, @CPF, @NomeMae, @SituacaoCadastro, @DataCadastro, @DataNascimento); SELECT CAST(SCOPE_IDENTITY() AS INT);";
                usuario.Id = _connection.Query<int>(sql, usuario, transaction).Single();

                if (usuario.Contato != null) {
                    usuario.Contato.UsuarioId = usuario.Id;
                    string sqlContato = "INSERT INTO Contatos(UsuarioId, Telefone, Celular) VALUES (@UsuarioId, @Telefone, @Celular); SELECT CAST(SCOPE_IDENTITY() AS INT);";
                    usuario.Contato.Id = _connection.Query<int>(sqlContato, usuario.Contato, transaction).Single();
                }

                if (usuario.EnderecosEntrega != null && usuario.EnderecosEntrega.Count > 0) {
                    foreach (var enderecoEntrega in usuario.EnderecosEntrega) {
                        if (enderecoEntrega != null) {
                            enderecoEntrega.UsuarioId = usuario.Id;
                            string sqlEndereco = "INSERT INTO EnderecosEntrega(UsuarioId, NomeEndereco, CEP, Estado, Cidade, Bairro, Endereco, Numero, Complemento) VALUES (@UsuarioId, @NomeEndereco, @CEP, @Estado, @Cidade, @Bairro, @Endereco, @Numero, @Complemento); SELECT CAST(SCOPE_IDENTITY() AS INT);";
                            enderecoEntrega.Id = _connection.Query<int>(sqlEndereco, enderecoEntrega, transaction).Single();
                        }
                    }
                }

                if (usuario.Departamentos != null && usuario.Departamentos.Count > 0) {
                    foreach (var departamento in usuario.Departamentos) {
                        if (departamento != null) {
                            string sqlUsuariosDepartamentos = "INSERT INTO UsuariosDepartamentos (UsuarioId, DepartamentoId) VALUES (@UsuarioId, @DepartamentoId)";
                            _connection.Execute(sqlUsuariosDepartamentos, new { UsuarioId = usuario.Id, DepartamentoId = departamento.Id }, transaction);
                        }
                    }
                }

                transaction.Commit();
            }
            catch (Exception) {
                try {
                    transaction.Rollback();
                }
                catch (Exception) {
                    // Retornar para UsuárioController alguma mensagem. Lançar uma exceção.
                }
            }
            finally {
                _connection.Close();
            }
        }

        public void Update(Usuario usuario) {
            _connection.Open();
            var transaction = _connection.BeginTransaction();

            try {
                string sql = "UPDATE Usuarios SET Nome = @Nome, Email = @Email, Sexo = @Sexo, RG = @RG, CPF = @CPF, NomeMae = @NomeMae, SituacaoCadastro = @SituacaoCadastro, DataCadastro = @DataCadastro, DataNascimento = @DataNascimento WHERE Id = @Id";
                _connection.Execute(sql, usuario, transaction);

                if (usuario.Contato != null) {
                    string sqlContato = "UPDATE Contatos SET UsuarioId = @UsuarioId, Telefone = @Telefone, Celular = @Celular WHERE Id = @Id";
                    _connection.Execute(sqlContato, usuario.Contato, transaction);
                }

                string sqlDeletarEnderecosEntrega = "DELETE FROM EnderecosEntrega WHERE UsuarioId = @Id";
                _connection.Execute(sqlDeletarEnderecosEntrega, usuario, transaction);

                if (usuario.EnderecosEntrega != null && usuario.EnderecosEntrega.Count > 0) {
                    foreach (var enderecoEntrega in usuario.EnderecosEntrega) {
                        if (enderecoEntrega != null) {
                            enderecoEntrega.UsuarioId = usuario.Id;
                            string sqlEndereco = "INSERT INTO EnderecosEntrega(UsuarioId, NomeEndereco, CEP, Estado, Cidade, Bairro, Endereco, Numero, Complemento) VALUES (@UsuarioId, @NomeEndereco, @CEP, @Estado, @Cidade, @Bairro, @Endereco, @Numero, @Complemento); SELECT CAST(SCOPE_IDENTITY() AS INT);";
                            enderecoEntrega.Id = _connection.Query<int>(sqlEndereco, enderecoEntrega, transaction).Single();
                        }
                    }
                }

                string sqlDeletarUsuariosDapartamentos = "DELETE FROM UsuariosDepartamentos WHERE UsuarioId = @Id";
                _connection.Execute(sqlDeletarUsuariosDapartamentos, usuario, transaction);

                if (usuario.Departamentos != null && usuario.Departamentos.Count > 0) {
                    foreach (var departamento in usuario.Departamentos) {
                        if (departamento != null) {
                            string sqlUsuariosDepartamentos = "INSERT INTO UsuariosDepartamentos (UsuarioId, DepartamentoId) VALUES (@UsuarioId, @DepartamentoId)";
                            _connection.Execute(sqlUsuariosDepartamentos, new { UsuarioId = usuario.Id, DepartamentoId = departamento?.Id }, transaction);
                        }
                    }
                }

                transaction.Commit();
            }
            catch (Exception ex) {
                try {
                    transaction.Rollback();
                }
                catch (Exception) {
                    // Retornar para UsuárioController alguma mensagem. Lançar uma exceção.
                }
            }
            finally {
                _connection.Close();
            }
        }



        public void Delete(int id) {
            _connection.Execute("DELETE FROM Usuarios WHERE Id = @Id", new { Id = id });
        }
    }
}