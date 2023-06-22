using eCommerce.API.Models;

namespace eCommerce.API.Repositories {
    interface IUsuarioRepository {

        public List<Usuario> Get();
        public Usuario Get(int id);
        public void Insert(Usuario usuario);
        public void Update(Usuario usuario);
        public void Delete(int id);
        public object GetMaiorDeIdade(int id);
        List<Usuario> GetUsuariosMaioresDe18();
        List<Usuario> GetUsuariosMenorDe18();

    }
}
