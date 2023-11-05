using System.ComponentModel.DataAnnotations.Schema;

namespace AnimalCaretakers.Data.Models;

public partial class UserSensitiveInfo
{
    [NotMapped]
    public SensitiveInfo<string> Skills
    {
        get => new(SkillsValue, SkillsIsPublic);
        set
        {
            SkillsValue = value.Value;
            SkillsIsPublic = value.IsPublic;
        }
    }

    [NotMapped]
    public SensitiveInfo<string> Portfolio
    {
        get => new(SuccesesValue, SuccesesIsPublic);
        set
        {
            SuccesesValue = value.Value;
            SuccesesIsPublic = value.IsPublic;
        }
    }

    [NotMapped]
    public SensitiveInfo<string> Succeses
    {
        get => new(SuccesesValue, SuccesesIsPublic);
        set
        {
            SuccesesValue = value.Value;
            SuccesesIsPublic = value.IsPublic;
        }
    }

    [NotMapped]
    public SensitiveInfo<decimal?> ExpectedSalary
    {
        get => new(ExpectedSalaryValue, ExpectedSalaryIsPublic);
        set
        {
            ExpectedSalaryValue = value.Value;
            ExpectedSalaryIsPublic = value.IsPublic;
        }
    }
}

public class SensitiveInfo<TValue>
{
    public TValue Value { get; }
    public bool IsPublic { get; }

    public SensitiveInfo(TValue value, bool isPublic)
    {
        Value = value;
        IsPublic = isPublic;
    }

    public SensitiveInfo<TValue> Get(bool onlyPublicInfo)
    {
        if (!onlyPublicInfo) return this;

        return new(IsPublic ? Value : default, IsPublic);
    }
}
