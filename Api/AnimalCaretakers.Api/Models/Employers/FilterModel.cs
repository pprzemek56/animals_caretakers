using AnimalCaretakers.Api.Extensions;
using AnimalCaretakers.Data.Models;

namespace AnimalCaretakers.Api.Models.Employers;

public class FilterModel : IFilter<User>, IFilter<ToSeePlan>
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

    public IQueryable<ToSeePlan> Filter(IQueryable<ToSeePlan> query)
    {
        if (GivenName.HasValue())
        {
            query = query.Where(p => p.Employee.GivenName.Contains(GivenName));
        }

        if (Surname.HasValue())
        {
            query = query.Where(p => p.Employee.Surname.Contains(Surname));
        }

        return query;
    }
}
