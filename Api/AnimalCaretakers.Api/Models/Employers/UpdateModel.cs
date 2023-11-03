using AnimalCaretakers.Data.Models;

namespace AnimalCaretakers.Api.Models.Employers;

public class UpdateModel
{
    public string GivenName { get; set; }
    public string Surname { get; set; }
    public SensitiveInfo<string> Skills { get; set; }
    public SensitiveInfo<string> Portfolio { get; set; }
    public SensitiveInfo<string> Succeses { get; set; }
    public SensitiveInfo<decimal> ExpectedSalary { get; set; }
}
