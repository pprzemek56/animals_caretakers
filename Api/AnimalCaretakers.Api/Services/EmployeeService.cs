using AnimalCaretakers.Api.Extensions;
using AnimalCaretakers.Api.Models.Employers;
using AnimalCaretakers.Data;
using AnimalCaretakers.Data.Enums;
using AnimalCaretakers.Data.Models;
using AnimalCaretakers.Paginations;
using Microsoft.EntityFrameworkCore;
using OneOf;
using OneOf.Types;

namespace AnimalCaretakers.Api.Services;

public class EmployeeService
{
    private readonly DataContext _context;

    public EmployeeService(DataContext context)
    {
        _context = context;
    }

    public async Task<List<ListItemModel>> GetEmployers(Pager pager, FilterModel filter)
    {
        return await _context.Users
            .AsNoTracking()
            .Where(p => p.UserType == (int)UserType.Employee)
            .Filter(filter)
            .Paginate(pager)
            .Select(p => new ListItemModel
            {
                Id = p.Id,
                GivenName = p.GivenName,
                Surname = p.Surname
            })
            .ToListAsync();
    }

    public async Task<OneOf<DetailsModel, NotFound>> GetEmployee(long userId, bool incrementVisitCounter, bool onlyPublicInfo)
    {
        var user = await _context.Users
            .Include(p => p.SensitiveInfo)
            .Where(p => p.Id == userId)
            .FirstOrDefaultAsync();

        if(user == null) 
            return new NotFound();

        if (user.UserTypeEnum == UserType.Recruiter)
            return new DetailsModel
            {
                GivenName = user.GivenName,
                Surname = user.Surname
            };

        if (incrementVisitCounter)
        {
            user.VisitCounter++;
            await _context.SaveChangesAsync();
        }

        return new DetailsModel
        {
            Id = user.Id,
            GivenName = user.GivenName,
            Surname = user.Surname,
            VisitCount = user.VisitCounter,
            Skills = user.SensitiveInfo.Skills.Get(onlyPublicInfo),
            Portfolio = user.SensitiveInfo.Portfolio.Get(onlyPublicInfo),
            Succeses = user.SensitiveInfo.Succeses.Get(onlyPublicInfo),
            ExpectedSalary = user.SensitiveInfo.ExpectedSalary.Get(onlyPublicInfo)
        };
    }

    public async Task<OneOf<DetailsModel, NotFound>> UpdateEmployee(long userId, UpdateModel form)
    {
        var user = await _context.Users
            .Include(p => p.SensitiveInfo)
            .Where(p => p.Id == userId)
            .FirstOrDefaultAsync();

        if (user == null) return new NotFound();

        user.GivenName = form.GivenName;
        user.Surname = form.Surname;

        if(user.UserTypeEnum == UserType.Employee)
        {
            user.SensitiveInfo.Skills = form.Skills;
            user.SensitiveInfo.Portfolio = form.Portfolio;
            user.SensitiveInfo.Succeses = form.Succeses;
            user.SensitiveInfo.ExpectedSalary = form.ExpectedSalary;
        }

        await _context.SaveChangesAsync();
        
        return new DetailsModel
        {
            Id = user.Id,
            GivenName = user.GivenName,
            Surname = user.Surname
        };
    }

    public async Task<OneOf<Success, NotFound>> DeleteEmployee(long userId)
    {
         var user = await _context.Users
            .Where(p => p.UserType == (int)UserType.Employee && p.Id == userId)
            .FirstOrDefaultAsync();

        if (user == null) return new NotFound();

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        
        return new Success();
    }
}
