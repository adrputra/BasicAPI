using API.Models;
using Client.Base;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Client.Repositories.Data
{
    public class EducationRepository : GeneralRepository<Education, string>
    {
        //private readonly Address address;
        //private readonly HttpClient httpClient;
        //private readonly string request;
        //private readonly IHttpContextAccessor contextAccessor;

        public EducationRepository(Address address) : base(address, "Education/")
        {
            //this.address = address;
            //this.request = request;
            //contextAccessor = new HttpContextAccessor();
            //httpClient = new HttpClient
            //{
            //    BaseAddress = new Uri(address.link)
            //};
        }

        public HttpStatusCode UpdateEducation(Education education, string id)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(education), Encoding.UTF8, "application/json");
            var result = httpClient.PutAsync(request, content).Result;
            return result.StatusCode;
        }
    }
}
