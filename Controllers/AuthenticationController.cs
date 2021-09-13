using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using $safeprojectname$.Interfaces;
using $safeprojectname$.ViewModels;

namespace $safeprojectname$.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly MainDbContext _db;
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(MainDbContext db, IAuthenticationService authenticationService)
        {
            _db = db;
            _authenticationService = authenticationService;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Authenticate(UserAuthenticationViewModel userAuthentication)
        {
            var user = _authenticationService.AuthenticateUser(userAuthentication);

            if (user == null)
            {
                return Unauthorized();
            }

            var token = _authenticationService.GenerateAuthenticationToken(user);

            var userModel = new UserViewModel()
            {
                Username = user.Username,
                Id = user.Id,
                Token = token
            };

            return Ok(userModel);
        }
    }
}