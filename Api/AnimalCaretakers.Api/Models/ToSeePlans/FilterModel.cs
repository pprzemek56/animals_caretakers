using AnimalCaretakers.Api.Extensions;
using AnimalCaretakers.Data.Models;

namespace AnimalCaretakers.Api.Models.ToSeePlans;

public class FilterModel : IFilter<ToSeePlan>
{
    public string GivenName { get; set; }
    public string Surname { get; set; }

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
