using FluentMigrator;

namespace AnimalCaretakers.Data.Migrations;

[Migration(2)]
public class AddUsersVisitCounterTable : Migration
{
    public override void Up()
    {
        Alter.Table("Users")
            .AddColumn("VisitCounter").AsInt32().NotNullable().WithDefaultValue(0);
    }

    public override void Down()
    {
        Delete.Column("VisitCounter").FromTable("Users");
    }
}
