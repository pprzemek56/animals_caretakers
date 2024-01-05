using AnimalCaretakers.Api.Validation;
using FluentValidation;
using System.ComponentModel.DataAnnotations;

namespace AnimalCaretakers.Api.Models.Meetings;

public class CreateModel : IValidatableObject
{
    public long? EmployeeId { get; set; }
    public DateTime? MeetingDate { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        return this.Rules(p =>
        {
            p.RuleFor(q => q.EmployeeId).NotNull().WithMessage("Pole jest wymagane");
            p.RuleFor(q => q.MeetingDate).NotEmpty().WithMessage("Pole jest wymagane");
        })
        .Validate(this)
        .Result();
    }
}
