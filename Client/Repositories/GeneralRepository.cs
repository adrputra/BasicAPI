using Client.Base;
using Client.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Client.Repositories
{
    public class GeneralRepository<TEntity, TId> : IRepository<TEntity, TId>
        where TEntity : class
    {
        public readonly Address address;
        public readonly string request;
        public readonly IHttpContextAccessor contextAccessor;
        public readonly HttpClient httpClient;

        public GeneralRepository(Address address, string request)
        {
            this.address = address;
            this.request = request;
            contextAccessor = new HttpContextAccessor();
            httpClient = new HttpClient
            {
                BaseAddress = new Uri(address.link)
            };
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", contextAccessor.HttpContext.Session.GetString("JWToken"));
        }
        public HttpStatusCode Delete(TId id)
        {
            var result = httpClient.DeleteAsync(request + id).Result;
            return result.StatusCode;
        }

        public async Task<Object> Get()
        {
            List<TEntity> entities = new List<TEntity>();

            using (var response = await httpClient.GetAsync(request))
                {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<TEntity>>(apiResponse);
            }
            return entities;
        }

        public async Task<Object> Get(TId id)
        {
            TEntity entity;

            using (var response = await httpClient.GetAsync(request + id))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entity = JsonConvert.DeserializeObject<TEntity>(apiResponse);
            }
            return entity;
        }

        public async Task<Object> Post(TEntity entity)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(entity), Encoding.UTF8, "application/json");
            using (var result = httpClient.PostAsync(address.link + request, content).Result)
            {
                string apiResponse = await result.Content.ReadAsStringAsync();
                entity = JsonConvert.DeserializeObject<TEntity>(apiResponse);
            }
            return entity;
        }

        //public HttpStatusCode Post(TEntity entity)
        //{
        //    StringContent content = new StringContent(JsonConvert.SerializeObject(entity), Encoding.UTF8, "application/json");
        //    var result = httpClient.PostAsync(address.link + request, content).Result;
        //    return result.StatusCode;
        //}

        public HttpStatusCode Put(TEntity entity, TId id)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(entity), Encoding.UTF8, "application/json");
            var result = httpClient.PutAsync(request + id, content).Result;
            return result.StatusCode;
        }
    }
}
