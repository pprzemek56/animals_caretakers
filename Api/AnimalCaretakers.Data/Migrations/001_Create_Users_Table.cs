using FluentMigrator;

namespace AnimalCaretakers.Data.Migrations;

[Migration(1)]
public class AddUsersTable : Migration
{
    public override void Up()
    {
        Create.Table("Users")
            .WithColumn("Id").AsInt64().PrimaryKey().Identity()
            .WithColumn("GivenName").AsString(60).Nullable()
            .WithColumn("Surname").AsString(60).Nullable()
            .WithColumn("Username").AsString(60).NotNullable()
            .WithColumn("Password").AsString(60).NotNullable();
    }

    public override void Down()
    {
        Delete.Table("Users");
    }
}
