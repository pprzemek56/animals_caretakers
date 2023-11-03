using AnimalCaretakers.Data.Enums;

namespace AnimalCaretakers.Data.Models;

public partial class User
{
    public UserType UserTypeEnum { get => (UserType)UserType; set => UserType = (int)value; }
}
