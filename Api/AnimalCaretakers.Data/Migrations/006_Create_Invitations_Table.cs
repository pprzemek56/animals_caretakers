using FluentMigrator;

namespace AnimalCaretakers.Data.Migrations;

[Migration(6)]
public class AddInvitationsTable : Migration
{
    public override void Up()
    {
        Create.Table("MeetingInvitations")
            .WithColumn("Id").AsInt64().PrimaryKey().Identity()
            .WithColumn("RecruiterId").AsInt64().NotNullable().ForeignKey("Users", "Id")
            .WithColumn("EmployeeId").AsInt64().NotNullable().ForeignKey("Users", "Id")
            .WithColumn("MeetingDate").AsDateTime2().NotNullable()
            .WithColumn("Status").AsInt32().NotNullable();
    }

    public override void Down()
    {
        Delete.Table("MeetingInvitations");
    }
}
