using System.Threading.Tasks;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace SkillLearn.Identity.Pages
{
    public class HomeModel : PageModel
    {
        private readonly ILogger<HomeModel> _logger;
        private readonly IIdentityServerInteractionService _identity;
        public string ErrorMessage { get; set; }
        public string ErrorId { get; set; }
        public string ErrorDescription { get; set; }


        public HomeModel(ILogger<HomeModel> logger, IIdentityServerInteractionService identity)
        {
            _logger = logger;
            _identity = identity;
        }

        public async Task OnGet(string errorId)
        {
            var errormessage = await _identity.GetErrorContextAsync(errorId);
            ErrorMessage = errormessage.Error;
            ErrorDescription= errormessage.ClientId;
        }
    }
}