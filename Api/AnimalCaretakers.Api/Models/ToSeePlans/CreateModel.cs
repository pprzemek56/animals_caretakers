using AnimalCaretakers.Api.Validation;
using FluentValidation;
using System.ComponentModel.DataAnnotations;

namespace AnimalCaretakers.Api.Models.ToSeePlans;

public class CreateModel : IValidatableObject
{
    public long? EmployeeId { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        return this.Rules(p =>
        {
            p.RuleFor(q => q.EmployeeId).NotNull().WithMessage("Pole jest wymagane");
        })
        .Validate(this)
        .Result();
    }
}
