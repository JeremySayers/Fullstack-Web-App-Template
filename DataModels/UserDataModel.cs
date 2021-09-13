using System.ComponentModel.DataAnnotations.Schema;

namespace $safeprojectname$.DataModels
{
    [Table("users")]
    public class UserDataModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}