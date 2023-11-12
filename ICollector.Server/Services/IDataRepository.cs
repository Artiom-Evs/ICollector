using ICollector.Server.Models;
using System.Linq.Expressions;

namespace ICollector.Server.Services;

public interface IDataRepository<T> 
    where T : ModelBase
{
    IQueryable<T> Query();

    Task SaveChangesAsync();

    Task<bool> AnyAsync(Expression<Func<T, bool>> predicate);
    Task<IEnumerable<T>> GetAsync();
    Task<T?> GetAsync(Expression<Func<T, bool>> predicate);
    Task<T> CreateAsync(T item);
    Task UpdateAsync(T item);
    Task DeleteAsync(Expression<Func<T, bool>> predicate);
}
