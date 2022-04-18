using API.Models;
using Client.Base;
using Client.Repositories.Data;
using Client.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Client.Controllers
{
    public class LoginController : BaseController<Account, AccountRepository, string>
    {
        private readonly AccountRepository accountRepository;

        public LoginController(AccountRepository accountRepository) : base(accountRepository)
        {
            this.accountRepository = accountRepository;
        }

        [HttpPost]
        public async Task<JsonResult> Login(LoginVM loginVM)
        {
            var result = await accountRepository.Auth(loginVM);
            if (result.login != null)
            {
                HttpContext.Session.SetString("JWToken", result.login);

            }
            return Json(result);
        }

        //[HttpPost("Auth/")]
        //public async Task<IActionResult> Auth(LoginVM login)
        //{
        //    var jwtToken = await accountRepository.Auth(login);
        //    var token = jwtToken.Token;

        //    if (token == null)
        //    {
        //        return RedirectToAction("index");
        //    }

        //    HttpContext.Session.SetString("JWToken", token);
        //    //HttpContext.Session.SetString("Name", jwtHandler.GetName(token));
        //    HttpContext.Session.SetString("ProfilePicture", "assets/img/theme/user.png");

        //    return RedirectToAction("index", "dashboard");
        //}

        //[HttpPost]
        //public JsonResult Login(LoginVM loginVM)
        //{
        //    var result = accountRepository.Login(loginVM);
        //    return Json(result);
        //}

        public IActionResult Index()
        {
            return View();
        }
    }
}
