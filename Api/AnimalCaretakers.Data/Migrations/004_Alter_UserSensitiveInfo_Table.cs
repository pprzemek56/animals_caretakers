using FluentMigrator;

namespace AnimalCaretakers.Data.Migrations;

[Migration(4)]
public class AlterUserSensitiveInfoTable : Migration
{
    public override void Up()
    {
        Alter.Table("UserSensitiveInfos")
            .AlterColumn("SkillsValue").AsString(512).Nullable()
            .AlterColumn("PortfolioValue").AsString(512).Nullable()
            .AlterColumn("SuccesesValue").AsString(512).Nullable()
            .AlterColumn("ExpectedSalaryValue").AsDecimal().Nullable();
    }

    public override void Down()
    {
        Alter.Table("UserSensitiveInfos")
            .AlterColumn("SkillsValue").AsString(512).NotNullable()
            .AlterColumn("PortfolioValue").AsString(512).NotNullable()
            .AlterColumn("SuccesesValue").AsString(512).NotNullable()
            .AlterColumn("ExpectedSalaryValue").AsDecimal().NotNullable();
    }
}
