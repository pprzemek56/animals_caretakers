using AnimalCaretakers.Data.Enums;

namespace AnimalCaretakers.Api.Models.Meetings;

public class ListItemModel
{
    public long Id {  get; set; }
    public string GivenName {  get; set; }
    public string Surname {  get; set; }
    public DateTime MeetingDate {  get; set; }
    public MeetingStatus Status {  get; set; }
}
