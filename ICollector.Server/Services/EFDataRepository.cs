using ICollector.Server.Data;
using ICollector.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace ICollector.Server.Services;

public class EFDataRepository<T> : IDataRepository<T>
    where T : ModelBase
{
    protected readonly ApplicationDbContext _context;

    public EFDataRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public virtual IQueryable<T> Query() => _context.Set<T>();

    public virtual async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }

    public virtual Task<bool> AnyAsync(Expression<Func<T, bool>> predicate)
    {
        return _context.Set<T>().AnyAsync(predicate);
    }

    public virtual async Task<IEnumerable<T>> GetAsync()
    {
        var items = await this.Query().ToListAsync();
        return items;
    }

    public virtual Task<T?> GetAsync(Expression<Func<T, bool>> predicate)
    {
        return _context.Set<T>().FirstOrDefaultAsync(predicate);
    }

    public virtual Task<T> CreateAsync(T item)
    {
        _context.Set<T>().Add(item);
        return Task.FromResult<T>(item);
    }

    public virtual Task UpdateAsync(T item)
    {
        _context.Set<T>().Attach(item);
        _context.Entry<T>(item).State = EntityState.Modified;
        return Task.CompletedTask;
    }

    public virtual async Task DeleteAsync(Expression<Func<T, bool>> predicate)
    {
        T? item = await this.GetAsync(predicate);

        if (item != null)
        {
            _context.Entry<T>(item).State = EntityState.Deleted;
        }
    }
}
