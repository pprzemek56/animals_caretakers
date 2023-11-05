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

public class ToSeePlansService
{
    private readonly DataContext _context;

    public ToSeePlansService(DataContext context)
    {
        _context = context;
    }

    public async Task<List<ListItemModel>> GetPlannedToSee(long recruiterId, Pager pager, FilterModel filter)
    {
        return await _context.ToSeePlans
            .AsNoTracking()
            .Where(p => p.RecruiterId == recruiterId)
            .Filter(filter)
            .Paginate(pager)
            .Select(p => new ListItemModel
            {
                Id = p.Id,
                GivenName = p.Employee.GivenName,
                Surname = p.Employee.Surname
            })
            .ToListAsync();
    }

    public async Task<OneOf<Success, Error<string>>> Create(long recruiterId, long employeeId)
    {
        var exists = await _context.ToSeePlans
            .AnyAsync(p => p.EmployeeId == employeeId && p.RecruiterId == recruiterId);

        if (exists)
            return new Error<string>("Wybrany pracownik jest już na liście do obejrzenia");

        var employeeExists = await _context.Users
            .AnyAsync(p => p.Id == employeeId && p.UserType == (int)UserType.Employee);

        if (!employeeExists)
            return new Error<string>("Wybrany pracownik nie istnieje");

        _context.Add(new ToSeePlan
        {
            RecruiterId = recruiterId,
            EmployeeId = employeeId
        });

        await _context.SaveChangesAsync();
        
        return new Success();
    }

    public async Task<OneOf<Success, NotFound>> Delete(long recruiterId, long employeeId)
    {
         var entity = await _context.ToSeePlans
            .Where(p => p.EmployeeId == employeeId && p.RecruiterId == recruiterId)
            .FirstOrDefaultAsync();

        if (entity == null) return new NotFound();

        _context.ToSeePlans.Remove(entity);
        await _context.SaveChangesAsync();
        
        return new Success();
    }
}
