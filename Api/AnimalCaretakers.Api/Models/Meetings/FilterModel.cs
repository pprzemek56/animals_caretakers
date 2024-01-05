using AnimalCaretakers.Api.Extensions;
using AnimalCaretakers.Data.Enums;
using AnimalCaretakers.Data.Models;

namespace AnimalCaretakers.Api.Models.Meetings;

public class FilterModel : IFilter<MeetingInvitation>
{
    public MeetingStatus? Status { get; set; }
    public DateTime? MeetingDateFrom { get; set; }
    public DateTime? MeetingDateTo { get; set; }


    public IQueryable<MeetingInvitation> Filter(IQueryable<MeetingInvitation> query)
    {
        if (Status.HasValue)
        {
            query = query.Where(p => p.Status == (int)Status.Value);
        }

        if (MeetingDateFrom.HasValue)
        {
            query = query.Where(p => p.MeetingDate >= MeetingDateFrom.Value);
        }

        if (MeetingDateTo.HasValue)
        {
            query = query.Where(p => p.MeetingDate <= MeetingDateTo.Value);
        }

        return query;
    }
}
