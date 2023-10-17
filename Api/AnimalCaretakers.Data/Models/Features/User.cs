using AnimalCaretakers.Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimalCaretakers.Data.Models
{
    public partial class User
    {
        public UserType UserTypeEnum { get => (UserType)UserType; set => UserType = (int)value; }
    }
}
