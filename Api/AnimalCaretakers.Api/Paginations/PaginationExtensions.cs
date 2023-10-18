﻿namespace AnimalCaretakers.Paginations;

public static class PaginationExtensions
{
    public static IQueryable<T> Paginate<T>(this IQueryable<T> items, Pager pager)
    {
        pager.TotalRows = items.Count();
        return items.Skip(pager.PageSize * (pager.PageIndex - 1)).Take(pager.PageSize);
    }
}
