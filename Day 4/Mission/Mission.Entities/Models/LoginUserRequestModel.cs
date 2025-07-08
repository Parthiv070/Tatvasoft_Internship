namespace Mission.Entities.Models
{
    public class LoginUserRequestModel
    {
        public string EmailAddress { get; set; }
        public string Password { get; set; }

        // Add for registration
        public string FirstName { get; set; }  // ✅ NEW FIELD
    }
}
