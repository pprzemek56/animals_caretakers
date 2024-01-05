using AnimalCaretakers.Data.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace AnimalCaretakers.Data.Models;

public partial class MeetingInvitation
{
    [NotMapped]
    public MeetingStatus StatusEnum
    {
        get => (MeetingStatus)Status;
        set => Status = (int)value;
    }
}
