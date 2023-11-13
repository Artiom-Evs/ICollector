using System.Linq.Expressions;

namespace ICollector.Server.Extensions;

public static class QueryExtensions
{
    public static IOrderedQueryable<T> OrderByWithDescending<T, TKey>(this IQueryable<T> items, Expression<Func<T, TKey>> property, bool descending)
        => descending
        ? items.OrderByDescending(property)
        : items.OrderBy(property);
}
