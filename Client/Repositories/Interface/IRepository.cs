using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace Client.Repositories.Interface
{
    public interface IRepository<T, X> 
        where T : class
    {
        //Task<List<T>> Get();
        //Task<T> Get(X id);
        Task<Object> Get();
        Task<Object> Get(X id);
        //HttpStatusCode Post(T entity);
        Task<Object> Post(T entity);
        HttpStatusCode Put(T entity, X id);
        HttpStatusCode Delete(X id);
    }
}
