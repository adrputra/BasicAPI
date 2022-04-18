using API.Models;
using Client.Base;
using Client.ViewModel;
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
    public class AccountRepository : GeneralRepository<Account, string>
    {
        //private readonly Address address;
        //private readonly HttpClient httpClient;
        //private readonly string request;
        //private readonly IHttpContextAccessor contextAccessor;

        public AccountRepository(Address address) : base(address, "Account/")
        {
            //this.address = address;
            //this.request = request;
            //contextAccessor = new HttpContextAccessor();
            //httpClient = new HttpClient
            //{
            //    BaseAddress = new Uri(address.link)
            //};
        }

        public async Task<Object> MasterData()
        {
            //List<MasterDataVM> entities = new List<MasterDataVM>();
            Object entities;

            using (var response = await httpClient.GetAsync(request + "master/"))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject(apiResponse);
            }
            return entities;
        }

        public async Task<Object> MasterDataId(string NIK)
        {
            //List<MasterDataVM> entities = new List<MasterDataVM>();
            Object entities;

            using (var response = await httpClient.GetAsync(request + "master/" + NIK))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject(apiResponse);
            }
            return entities;
        }

        public HttpStatusCode Register(RegisterVM registerVM)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(registerVM), Encoding.UTF8, "application/json");
            var result = httpClient.PostAsync(address.link + request + "register/", content).Result;
            return result.StatusCode;
        }

        public async Task<Object> Login(LoginVM loginVM)
        {
            Object entities = null;
            StringContent content = new StringContent(JsonConvert.SerializeObject(loginVM), Encoding.UTF8, "application/json");
            using (var response = await httpClient.PostAsync(request + "login", content))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject(apiResponse);
            }

            return entities;
        }

        public async Task<JWTokenVM> Auth(LoginVM login)
        {
            JWTokenVM token = null;

            StringContent content = new StringContent(JsonConvert.SerializeObject(login), Encoding.UTF8, "application/json");
            var result = await httpClient.PostAsync(request + "login", content);

            string apiResponse = await result.Content.ReadAsStringAsync();
            token = JsonConvert.DeserializeObject<JWTokenVM>(apiResponse);

            return token;
        }


    }
}
