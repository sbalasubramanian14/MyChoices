using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;

namespace WhitePage.MyWeb.UI.Controllers
{
    public abstract class WhitePageController : Controller
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (this.User != null && this.User.Identity.IsAuthenticated)
            {
             
            }
        }

        public int LoggedInUserId
        {
            get
            {
                var result = 0;
                if (this.Request.Headers["UserId"].Any())
                {
                    int.TryParse(this.Request.Headers["UserId"].First(), out result);
                }
                return result;
            }
        }

        public object CookieAuthenticationDefaults { get; private set; }
    }
}
