using FluentMigrator;

namespace AnimalCaretakers.Data.Migrations;

[Migration(5)]
public class AddToSeePlansTable : Migration
{
    public override void Up()
    {
        Create.Table("ToSeePlans")
            .WithColumn("Id").AsInt64().PrimaryKey().Identity()
            .WithColumn("RecruiterId").AsInt64().NotNullable().ForeignKey("Users", "Id")
            .WithColumn("EmployeeId").AsInt64().NotNullable().ForeignKey("Users", "Id");
    }

    public override void Down()
    {
        Delete.Table("ToSeePlans");
    }
}
