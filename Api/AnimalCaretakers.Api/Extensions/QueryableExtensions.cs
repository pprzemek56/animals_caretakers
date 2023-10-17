namespace AnimalCaretakers.Api.Extensions;

public static class QueryableExtensions
{
    public static IQueryable<T> Filter<T>(this IQueryable<T> query, IFilter<T> filter) => filter.Filter(query);
}
