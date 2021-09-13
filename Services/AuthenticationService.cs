using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using $safeprojectname$.Interfaces;
using $safeprojectname$.ViewModels;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using $safeprojectname$.DataModels;

namespace $safeprojectname$.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly MainDbContext _db;

        private readonly AppSettings _appSettings;

        public AuthenticationService(MainDbContext db, IOptions<AppSettings> appSettings)
        {
            _db = db;
            _appSettings = appSettings.Value;
        }

        public UserDataModel AuthenticateUser(UserAuthenticationViewModel userAuthentication)
        {
            var user = _db.Users.SingleOrDefault(user => user.Username == userAuthentication.Username);

            if (user == null)
            {
                return null;
            }

            var passwordMatch = BCrypt.Net.BCrypt.Verify(userAuthentication.Password, user.Password);

            if (passwordMatch)
            {
                return user;
            }

            return null;
        }

        /// <summary>
        /// Generates an authentication token for the user
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>Returns an authentication token.</returns>
        public string GenerateAuthenticationToken(UserDataModel user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_appSettings.JWTSecret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Username.ToString()),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}