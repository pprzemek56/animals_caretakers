using AnimalCaretakers.Api.Validation;
using AnimalCaretakers.Data.Models;
using FluentValidation;
using System.ComponentModel.DataAnnotations;

namespace AnimalCaretakers.Api.Models.Employers;

public class UpdateModel : IValidatableObject
{
    public string GivenName { get; set; }
    public string Surname { get; set; }
    public SensitiveInfo<string> Skills { get; set; }
    public SensitiveInfo<string> Portfolio { get; set; }
    public SensitiveInfo<string> Succeses { get; set; }
    public SensitiveInfo<decimal?> ExpectedSalary { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        return this.Rules(p =>
        {
            p.RuleFor(q => q.GivenName).NotEmpty().WithMessage("Pole jest wymagane");
            p.RuleFor(q => q.Surname).NotEmpty().WithMessage("Pole jest wymagane");
        })
        .Validate(this)
        .Result();
    }
}
