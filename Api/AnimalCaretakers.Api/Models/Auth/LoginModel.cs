using AnimalCaretakers.Api.Validation;
using FluentValidation;
using System.ComponentModel.DataAnnotations;

namespace AnimalCaretakers.Api.Models.Auth;

public class LoginFormModel : IValidatableObject
{
    public string Username { get; set; }
    public string Password { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        return this.Rules(p =>
        {
            p.RuleFor(q => q.Username).NotEmpty().WithMessage("Pole jest wymagane");
            p.RuleFor(q => q.Password).NotEmpty().WithMessage("Pole jest wymagane");
        })
        .Validate(this)
        .Result();
    }
}
