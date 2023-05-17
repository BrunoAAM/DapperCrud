using System.Security.Cryptography.X509Certificates;
using eCommerce.API.Models;
using eCommerce.API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace eCommerce.API.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase {

        private IUsuarioRepository _repository;
        public UsuariosController() {
            _repository = new UsuarioRepository();
        }

        [HttpGet]
        public IActionResult Get() {
            return Ok(_repository.Get());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id) {
            var usuario = _repository.Get(id);

            if (usuario == null) {
                return NotFound(); //ERRO HTTP: 404 - Not Found
            }

            return Ok(usuario);
        }
        [HttpGet("maioresde18")]
        public IActionResult GetMaioresDe18() {
            try {
                List<Usuario> usuariosMaioresDe18 = _repository.GetUsuariosMaioresDe18();
                return Ok(usuariosMaioresDe18);
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message); // ERRO HTTP: 500 - Internal Server Error
            }
        }

        [HttpPost]
        public IActionResult Insert([FromBody] Usuario usuario) {
            _repository.Insert(usuario);
            return Ok(usuario);
        }
        [HttpPut]
        public IActionResult Update([FromBody] Usuario usuario) {
            _repository.Update(usuario);
            return Ok(usuario);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id) {
            _repository.Delete(id);
            return Ok();
        }



    }
}
