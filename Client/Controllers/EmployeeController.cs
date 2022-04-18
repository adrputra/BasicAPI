using API.Models;
using Client.Base;
using Client.Repositories.Data;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Client.Controllers
{
    public class EmployeeController : BaseController<Employee, EmployeeRepository, string>
    {
        private readonly EmployeeRepository repository;
        public EmployeeController(EmployeeRepository repository) : base(repository)
        {
            this.repository = repository;
        }

        [HttpPut]
        public JsonResult UpdateNIK(Employee employee, string NIK)
        {
            var result = repository.UpdateEmployee(employee, NIK);
            return Json(result);
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
