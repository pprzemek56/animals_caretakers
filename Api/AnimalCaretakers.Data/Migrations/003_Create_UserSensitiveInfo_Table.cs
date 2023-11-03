using FluentMigrator;

namespace AnimalCaretakers.Data.Migrations;

[Migration(3)]
public class AddUserSensitiveInfoTable : Migration
{
    public override void Up()
    {
        Create.Table("UserSensitiveInfos")
            .WithColumn("Id").AsInt64().PrimaryKey().Identity()

            .WithColumn("SkillsValue").AsString(512).NotNullable()
            .WithColumn("SkillsIsPublic").AsBoolean().NotNullable()
            
            .WithColumn("PortfolioValue").AsString(512).NotNullable()
            .WithColumn("PortfolioIsPublic").AsBoolean().NotNullable()
            
            .WithColumn("SuccesesValue").AsString(512).NotNullable()
            .WithColumn("SuccesesIsPublic").AsBoolean().NotNullable()
            
            .WithColumn("ExpectedSalaryValue").AsDecimal().NotNullable()
            .WithColumn("ExpectedSalaryIsPublic").AsBoolean().NotNullable();

        Alter.Table("Users")
            .AddColumn("SensitiveInfoId").AsInt64().Unique().NotNullable().ForeignKey("UserSensitiveInfos", "Id");
    }

    public override void Down()
    {
        Delete.Column("SensitiveInfoId").FromTable("Users");
        Delete.Table("UserSensitiveInfos");
    }
}
