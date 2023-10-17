using AnimalCaretakers.Data.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimalCaretakers.Data.Configurations;

public partial class UserConfiguration
{
    partial void OnConfigurePartial(EntityTypeBuilder<User> entity)
    {
        entity.Ignore(p => p.UserTypeEnum);
    }
}
