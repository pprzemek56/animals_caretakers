using FluentValidation;

namespace AnimalCaretakers.Api.Validation;

public interface IFluentValidator<TModel> : IValidator<TModel>
{
    IFluentValidator<TModel> Rules(Action<FluentValidator<TModel>> action, bool condition = true);
}

public static class Validation
{
    public static IFluentValidator<TModel> Rules<TModel>(Action<FluentValidator<TModel>> action)
    {
        return new FluentValidator<TModel>(action);
    }
}

public class FluentValidator<TModel> : AbstractValidator<TModel>, IFluentValidator<TModel>
{
    #region FluentValidator()
    public FluentValidator(Action<FluentValidator<TModel>> action)
    {
        action(this);
    }
    #endregion

    #region Rules()
    public IFluentValidator<TModel> Rules(Action<FluentValidator<TModel>> action, bool condition = true)
    {
        if (condition)
        {
            Include(new FluentValidator<TModel>(action));
        }

        return this;
    }
    #endregion
}

public static class _ValidationExtensions
{
    #region Result()
    public static IEnumerable<ValidationResult> Result(this FluentValidation.Results.ValidationResult result)
    {
        return result.Errors.Select(p => new ValidationResult(p.ErrorMessage, new[] { p.PropertyName }));
    }
    #endregion

    #region Rules()
    public static IFluentValidator<TModel> Rules<TModel>(this TModel model, Action<FluentValidator<TModel>> action)
    {
        return Validation.Rules(action);
    }
    #endregion
}