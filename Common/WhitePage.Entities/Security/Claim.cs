namespace WhitePage.Entities.Security
{
    public class Claim
    {
        public Claim()
        {

        }
        public Claim(string claimType, string claimValue)
        {
            this.ClaimType = claimType;
            this.ClaimValue = claimValue;
        }

        public string ClaimType { get; set; }
        public string ClaimValue { get; set; }
    }
}
