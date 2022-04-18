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
    public class UniversityRepository : GeneralRepository<University, string>
    {
        //private readonly Address address;
        //private readonly HttpClient httpClient;
        //private readonly string request;
        //private readonly IHttpContextAccessor contextAccessor;

        public UniversityRepository(Address address) : base(address, "University/")
        {
            //this.address = address;
            //this.request = request;
            //contextAccessor = new HttpContextAccessor();
            //httpClient = new HttpClient
            //{
            //    BaseAddress = new Uri(address.link)
            //};
        }

        public HttpStatusCode UpdateEducation(University university, string id)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(university), Encoding.UTF8, "application/json");
            var result = httpClient.PutAsync(request, content).Result;
            return result.StatusCode;
        }
    }
}
