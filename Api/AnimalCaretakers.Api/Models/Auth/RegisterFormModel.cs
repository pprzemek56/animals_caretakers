using AnimalCaretakers.Api.Validation;
using AnimalCaretakers.Data.Enums;
using FluentValidation;
using System.ComponentModel.DataAnnotations;

namespace AnimalCaretakers.Api.Models.Auth;

public class RegisterFormModel : IValidatableObject
{
    public string GivenName { get; set; }
    public string Surname { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public UserType UserType { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        return this.Rules(p =>
        {
            p.RuleFor(q => q.GivenName).NotEmpty().WithMessage("Pole jest wymagane");
            p.RuleFor(q => q.Surname).NotEmpty().WithMessage("Pole jest wymagane");
            p.RuleFor(q => q.Username).NotEmpty().WithMessage("Pole jest wymagane").MinimumLength(3).WithMessage("Nazwa użytkownika musi mieć minimum 3 znaki");
            p.RuleFor(q => q.Password).NotEmpty().WithMessage("Pole jest wymagane").MinimumLength(5).WithMessage("Hasło musi mieć minimum 5 znaków");
            p.RuleFor(q => q.UserType).NotEmpty().WithMessage("Pole jest wymagane");
        })
        .Validate(this)
        .Result();
    }
}
