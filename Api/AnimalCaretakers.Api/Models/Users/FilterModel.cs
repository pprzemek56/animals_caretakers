using AnimalCaretakers.Api.Extensions;
using AnimalCaretakers.Data.Models;

namespace AnimalCaretakers.Api.Models.Users;

public class FilterModel : IFilter<User>
{
    public string GivenName { get; set; }
    public string Surname { get; set; }

    public IQueryable<User> Filter(IQueryable<User> query)
    {
        if (GivenName.HasValue())
        {
            query = query.Where(p => p.GivenName.Contains(GivenName));
        }

        if (Surname.HasValue())
        {
            query = query.Where(p => p.Surname.Contains(Surname));
        }

        return query;
    }
}
