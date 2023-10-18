namespace AnimalCaretakers.Api.Extensions;

public interface IFilter<T>
{
    IQueryable<T> Filter(IQueryable<T> query);
}
