namespace AnimalCaretakers.Paginations;

public static class Pagination
{
    public static Pagination<T> FormT<T>(IEnumerable<T> items, int totalRows)
    {
        return new Pagination<T>(items, totalRows);
    }
}

public class Pagination<T>
{
    public IEnumerable<T> Items { get; set; }

    public int TotalRows { get; set; }

    public Pagination(IEnumerable<T> items, int totalRows)
    {
        Items = items;
        TotalRows = totalRows;
    }
}
