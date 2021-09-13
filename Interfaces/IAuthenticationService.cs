using $safeprojectname$.DataModels;
using $safeprojectname$.ViewModels;

namespace $safeprojectname$.Interfaces
{
    public interface IAuthenticationService
    {
        public UserDataModel AuthenticateUser(UserAuthenticationViewModel userAuthentication);

        /// <summary>
        /// Generates an authentication token for the user
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>Returns an authentication token.</returns>
        public string GenerateAuthenticationToken(UserDataModel user);
    }
}