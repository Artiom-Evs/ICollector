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

    public IQueryable<T> Query() => _context.Set<T>();
    
    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }

    public Task<bool> AnyAsync(Expression<Func<T, bool>> predicate)
    {
        return _context.Set<T>().AnyAsync(predicate);
    }

    public async Task<IEnumerable<T>> GetAsync()
    {
        var items = await _context.Set<T>().ToListAsync();
        return items;
    }

    public Task<T?> GetAsync(Expression<Func<T, bool>> predicate)
    {
        return _context.Set<T>().FirstOrDefaultAsync(predicate);
    }

    public Task<T> CreateAsync(T item)
    {
        _context.Set<T>().Add(item);
        return Task.FromResult<T>(item);
    }

    public Task UpdateAsync(T item)
    {
        var tracked = _context.ChangeTracker.Entries<T>().FirstOrDefault(ti => ti.Entity.Id == item.Id);

        if (tracked != null)
        {
            tracked.State = EntityState.Detached;
        }

        _context.Set<T>().Attach(item);
        _context.Entry<T>(item).State = EntityState.Modified;
        return Task.CompletedTask;
    }

    public async Task DeleteAsync(Expression<Func<T, bool>> predicate)
    {
        T? item = await this.GetAsync(predicate);

        if (item != null)
        {
            _context.Entry<T>(item).State = EntityState.Deleted;
        }
    }
}
