using API.Models;
using Client.Base;
using Client.Repositories.Data;
using Client.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Client.Controllers
{
    public class AccountController : BaseController<Account, AccountRepository, string>
    {
        private readonly AccountRepository accountRepository;

        public AccountController(AccountRepository accountRepository) : base(accountRepository)
        {
            this.accountRepository = accountRepository;
        }

        [HttpGet]
        public async Task<JsonResult> GetMaster()
        {
            var result = await accountRepository.MasterData();
            return Json(result);
        }

        [HttpGet]
        public async Task<JsonResult> GetMasterId(string NIK)
        {
            var result = await accountRepository.MasterDataId(NIK);
            return Json(result);
        }

        [HttpPost]
        public JsonResult Register(RegisterVM registerVM)
        {
            var result = accountRepository.Register(registerVM);
            return Json(result);
        }

        [Authorize(Roles =  "Director,Manager")]
        public IActionResult Index()
        {
            return View();
        }
    }
}
