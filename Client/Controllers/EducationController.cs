using API.Models;
using Client.Base;
using Client.Repositories.Data;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Client.Controllers
{
    public class EducationController : BaseController<Education, EducationRepository, string>
    {
        private readonly EducationRepository repository;
        public EducationController(EducationRepository repository) : base(repository)
        {
            this.repository = repository;
        }

        [HttpPut]
        public JsonResult UpdateEdu(Education education, string id)
        {
            var result = repository.UpdateEducation(education, id);
            return Json(result);
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
