using FluentMigrator;

namespace AnimalCaretakers.Data.Migrations;

[Migration(7)]
public class SeedUsersTable : Migration
{
   public override void Up()
    {
        Insert.IntoTable("Users")
            .Row(new 
            { 
                GivenName = "Janusz", 
                Surname = "Dul", 
                Username = "emp", 
                Password = "$2a$12$Pg6VxkeseOC0659kVeqaU.qKcEFfGgwuasiQZRAu3.5G4XjwVONVe", // 12345
                UserType = 1,
                VisitCounter = 0,
                SensitiveInfoId = 1
            })
            .Row(new 
            { 
                GivenName = "Zofia", 
                Surname = "Barańska",
                Username = "rec", 
                Password = "$2a$12$Pg6VxkeseOC0659kVeqaU.qKcEFfGgwuasiQZRAu3.5G4XjwVONVe",
                UserType = 0,
                VisitCounter = 0,
                SensitiveInfoId = 2
            })
            .Row(new
            {
                GivenName = "Elżbieta",
                Surname = "Nowak",
                Username = "ela", 
                Password = "$2a$12$Pg6VxkeseOC0659kVeqaU.qKcEFfGgwuasiQZRAu3.5G4XjwVONVe",
                UserType = 1,
                VisitCounter = 8,
                SensitiveInfoId = 3
            })
            .Row(new
            {
                GivenName = "Mateusz",
                Surname = "Kowalski",
                Username = "mateusz", 
                Password = "$2a$12$Pg6VxkeseOC0659kVeqaU.qKcEFfGgwuasiQZRAu3.5G4XjwVONVe",
                UserType = 0,
                VisitCounter = 10,
                SensitiveInfoId = 4
            })
            .Row(new
            {
                GivenName = "Aleksandra",
                Surname = "Wiśniewska",
                Username = "ola", 
                Password = "$2a$12$Pg6VxkeseOC0659kVeqaU.qKcEFfGgwuasiQZRAu3.5G4XjwVONVe",
                UserType = 0,
                VisitCounter = 11,
                SensitiveInfoId = 5
            })
             .Row(new
            {
                GivenName = "Piotr",
                Surname = "Jankowski",
                Username = "piotr",
                Password = "$2a$12$Pg6VxkeseOC0659kVeqaU.qKcEFfGgwuasiQZRAu3.5G4XjwVONVe",
                UserType = 1,
                VisitCounter = 7,
                SensitiveInfoId = 6
            })
            .Row(new
            {
                GivenName = "Janka",
                Surname = "Nowak",
                Username = "janka",
                Password = "$2a$12$Pg6VxkeseOC0659kVeqaU.qKcEFfGgwuasiQZRAu3.5G4XjwVONVe",
                UserType = 0,
                VisitCounter = 2,
                SensitiveInfoId = 7
            })
            .Row(new
            {
                GivenName = "Marysia",
                Surname = "Kowalska",
                Username = "marysia",
                Password = "$2a$12$Pg6VxkeseOC0659kVeqaU.qKcEFfGgwuasiQZRAu3.5G4XjwVONVe",
                UserType = 0,
                VisitCounter = 6,
                SensitiveInfoId = 8
            })
            .Row(new
            {
                GivenName = "Mariusz",
                Surname = "Brytwaniuk",
                Username = "mariusz",
                Password = "$2a$12$Pg6VxkeseOC0659kVeqaU.qKcEFfGgwuasiQZRAu3.5G4XjwVONVe",
                UserType = 1,
                VisitCounter = 21,
                SensitiveInfoId = 9
            })
            .Row(new
            {
                GivenName = "Kuba",
                Surname = "Jakub",
                Username = "kuba",
                Password = "$2a$12$Pg6VxkeseOC0659kVeqaU.qKcEFfGgwuasiQZRAu3.5G4XjwVONVe",
                UserType = 1,
                VisitCounter = 0,
                SensitiveInfoId = 10
            });

        Insert.IntoTable("UserSensitiveInfos")
            .Row(new 
            { 
                Id = 1,
                SkillsValue = "Brak małych dzieci, Brak toksycznych roślin, Brak innych zwierząt.",
                SkillsIsPublic = true,
                PortfolioValue = "Doświadczony opiekun z pasją do zwierząt.",
                PortfolioIsPublic = true,
                SuccesesValue = "Pomoc w relokacji i adaptacji zwierząt w ogrodach zoologicznych.",
                SuccesesIsPublic = true,
                ExpectedSalaryValue = 21,
                ExpectedSalaryIsPublic = true
            })
            .Row(new 
            { 
                Id = 2,
                SkillsValue = "",
                SkillsIsPublic = true,
                PortfolioValue = "Posiadam 2 małe pieski",
                PortfolioIsPublic = true,
                SuccesesValue = "",
                SuccesesIsPublic = true,
                ExpectedSalaryValue = 0,
                ExpectedSalaryIsPublic = true
            })
            .Row(new
            {
                Id = 3,
                SkillsValue = "Opieka nad psami, kotami, ptakami. Prowadzenie szkoleń z zakresu behawiorystyki zwierząt.",
                SkillsIsPublic = true,
                PortfolioValue = "Współpracuję ze schroniskiem, a także udzielam się w programach edukacyjnych dla dzieci na temat opieki nad zwierzętami.",
                PortfolioIsPublic = true,
                SuccesesValue = "Założenie fundacji wspierającej schroniska dla zwierząt.",
                SuccesesIsPublic = true,
                ExpectedSalaryValue = 16,
                ExpectedSalaryIsPublic = true
            })
            .Row(new
            {
                Id = 4,
                SkillsValue = "",
                SkillsIsPublic = true,
                PortfolioValue = "Posiadam pająka i węża",
                PortfolioIsPublic = true,
                SuccesesValue = "",
                SuccesesIsPublic = true,
                ExpectedSalaryValue = 0,
                ExpectedSalaryIsPublic = true
            })
            .Row(new
            {
                Id = 5,
                SkillsValue = "",
                SkillsIsPublic = true,
                PortfolioValue = "Posiadam dużego pieska i kota",
                PortfolioIsPublic = true,
                SuccesesValue = "",
                SuccesesIsPublic = true,
                ExpectedSalaryValue = 0,
                ExpectedSalaryIsPublic = true
            })
            .Row(new
            {
                Id = 6,
                SkillsValue = "Brak małych dzieci, Brak toksycznych roślin, Pozwalam wejść na kanapę, Znajomość pierwszej pomocy",
                SkillsIsPublic = true,
                PortfolioValue = "Kocham przebywać ze zwierzętami, z przyjemnością zaopiekuję się Twoim pupilem. Odbyłem praktyki studencie w ogrodzie zoologicznym. Mieszkam w bloku i nie mam własnego zwierzaka.",
                PortfolioIsPublic = true,
                SuccesesValue = "Przyjmę psy, koty, a także inne zwierzęta.",
                SuccesesIsPublic = true,
                ExpectedSalaryValue = 18,
                ExpectedSalaryIsPublic = true
            })
            .Row(new
            {
                Id = 7,
                SkillsValue = "",
                SkillsIsPublic = true,
                PortfolioValue = "",
                PortfolioIsPublic = true,
                SuccesesValue = "Posiadam piękną kotkę syjamską.",
                SuccesesIsPublic = true,
                ExpectedSalaryValue = 0,
                ExpectedSalaryIsPublic = true
            })
            .Row(new
            {
                Id = 8,
                SkillsValue = "",
                SkillsIsPublic = true,
                PortfolioValue = "Jestem właścicielką rybek akwariowych i papugi falistej.",
                PortfolioIsPublic = true,
                SuccesesValue = "",
                SuccesesIsPublic = true,
                ExpectedSalaryValue = 0,
                ExpectedSalaryIsPublic = true
            })
            .Row(new
            {
                Id = 9,
                SkillsValue = "Mieszkanie, Brak klatek, Brak osób palących, Brak małych dzieci, Brak toksycznych roślin, Pozwalam wejść na łóżko.",
                SkillsIsPublic = true,
                PortfolioValue = "Organizacja zbiórek karmy dla schronisk. Prowadzę szkolenia z zakresu behawiorystyki zwierząt",
                PortfolioIsPublic = true,
                SuccesesValue = "Zaopiekuję się rybkami, gryzoniami, małym ssakiem, psami, kotami",
                SuccesesIsPublic = true,
                ExpectedSalaryValue = 21,
                ExpectedSalaryIsPublic = true
            })
            .Row(new
            {
                Id = 10,
                SkillsValue = "Bliskość parku.",
                SkillsIsPublic = true,
                PortfolioValue = "Chętnie zaopiekuje się zwierzaczkiem. Odpowiadają mi tylko w weekendy, z powodu tego że w tygodniu mam szkołę np.",
                PortfolioIsPublic = true,
                SuccesesValue = "Nie lubię kotów.",
                SuccesesIsPublic = true,
                ExpectedSalaryValue = 40,
                ExpectedSalaryIsPublic = true
            });

        Insert.IntoTable("ToSeePlans")
            .Row(new 
            { 
                RecruiterId = 2, 
                EmployeeId = 1  
            })
            .Row(new 
            { 
                RecruiterId = 4, 
                EmployeeId = 1
            })
            .Row(new 
            { 
                RecruiterId = 5, 
                EmployeeId = 3  
            })
            .Row(new 
            { 
                RecruiterId = 7, 
                EmployeeId = 6
            })
            .Row(new 
            { 
                RecruiterId = 8, 
                EmployeeId = 9
            })
            .Row(new 
            { 
                RecruiterId = 4, 
                EmployeeId = 10
            })
            .Row(new 
            { 
                RecruiterId = 5, 
                EmployeeId = 6  
            })
            .Row(new 
            { 
                RecruiterId = 7, 
                EmployeeId = 9
            })
            .Row(new 
            { 
                RecruiterId = 8, 
                EmployeeId = 1
            });

        Insert.IntoTable("MeetingInvitations")
            .Row(new 
            { 
                RecruiterId = 2, 
                EmployeeId = 1,  
                MeetingDate = DateTime.Now.AddDays(1),
                Status = 0
            })
            .Row(new 
            { 
                RecruiterId = 4, 
                EmployeeId = 1,  
                MeetingDate = DateTime.Now.AddDays(2),
                Status = 0
            })
            .Row(new 
            { 
                RecruiterId = 5, 
                EmployeeId = 3,  
                MeetingDate = DateTime.Now.AddDays(1),
                Status = 0
            })
            .Row(new 
            { 
                RecruiterId = 7, 
                EmployeeId = 6,  
                MeetingDate = DateTime.Now.AddDays(2),
                Status = 0
            })
            .Row(new 
            { 
                RecruiterId = 8, 
                EmployeeId = 9,  
                MeetingDate = DateTime.Now.AddDays(1),
                Status = 0
            })
            .Row(new 
            { 
                RecruiterId = 4, 
                EmployeeId = 10,  
                MeetingDate = DateTime.Now.AddDays(1),
                Status = 0
            })
            .Row(new 
            { 
                RecruiterId = 5, 
                EmployeeId = 6,  
                MeetingDate = DateTime.Now.AddDays(2),
                Status = 0
            })
            .Row(new 
            { 
                RecruiterId = 7, 
                EmployeeId = 9,  
                MeetingDate = DateTime.Now.AddDays(3),
                Status = 0
            })
            .Row(new 
            { 
                RecruiterId = 8, 
                EmployeeId = 1,  
                MeetingDate = DateTime.Now.AddDays(3),
                Status = 0
            })
            .Row(new 
            { 
                RecruiterId = 4, 
                EmployeeId = 10,  
                MeetingDate = DateTime.Now.AddDays(6),
                Status = 0
            })
            .Row(new 
            { 
                RecruiterId = 5, 
                EmployeeId = 6,  
                MeetingDate = DateTime.Now.AddDays(7),
                Status = 0
            })
            .Row(new 
            { 
                RecruiterId = 7, 
                EmployeeId = 9,  
                MeetingDate = DateTime.Now.AddDays(8),
                Status = 0
            })
            .Row(new 
            { 
                RecruiterId = 8, 
                EmployeeId = 1,  
                MeetingDate = DateTime.Now.AddDays(9),
                Status = 0
            })
            .Row(new 
            { 
                RecruiterId = 2, 
                EmployeeId = 9,  
                MeetingDate = DateTime.Now.AddDays(-1),
                Status = 1
            })
            .Row(new 
            { 
                RecruiterId = 4, 
                EmployeeId = 1,  
                MeetingDate = DateTime.Now.AddDays(-2),
                Status = 1
            })
            .Row(new 
            { 
                RecruiterId = 8, 
                EmployeeId = 9,  
                MeetingDate = DateTime.Now.AddDays(-3),
                Status = 2
            })
            .Row(new 
            { 
                RecruiterId = 4, 
                EmployeeId = 1,  
                MeetingDate = DateTime.Now.AddDays(-3),
                Status = 2
            })
            .Row(new 
            { 
                RecruiterId = 5, 
                EmployeeId = 6,  
                MeetingDate = DateTime.Now.AddDays(-5),
                Status = 2
            });
    }

    public override void Down()
    {
    Delete.FromTable("MeetingInvitations").AllRows();
    Delete.FromTable("ToSeePlans").AllRows();
    Delete.FromTable("Users").AllRows();
    Delete.FromTable("UserSensitiveInfos").AllRows();

    // Delete.Table("MeetingInvitations");
    // Delete.Table("ToSeePlans");
    // Delete.Table("Users");
    // Delete.Table("UserSensitiveInfos");
    }
}