using AnimalCaretakers.Api.Extensions;
using AnimalCaretakers.Api.Models.Employers;
using AnimalCaretakers.Data;
using AnimalCaretakers.Data.Enums;
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

    public async Task<DetailsModel> GetEmployee(long userId)
    {
        var user = await _context.Users
            .Where(p => p.UserType == (int)UserType.Employee && p.Id == userId)            
            .FirstOrDefaultAsync();
            
        user.VisitCounter ++;
        await _context.SaveChangesAsync();

        return new DetailsModel 
        {
            Id = user.Id,
            GivenName = user.GivenName,
            Surname = user.Surname
        };
    }

    public async Task<OneOf<DetailsModel, NotFound>> UpdateEmployee(long userId, UpdateModel form)
    {
        var user = await _context.Users
            .Where(p => p.UserType == (int)UserType.Employee && p.Id == userId)
            .FirstOrDefaultAsync();

        if (user == null) return new NotFound();

        user.GivenName = form.GivenName;
        user.Surname = form.Surname;
        // TODO: update list of details informations

        await _context.SaveChangesAsync();
        
        return new DetailsModel
        {
            Id = user.Id,
            GivenName = user.GivenName,
            Surname = user.Surname
        };
    }

    public async Task<OneOf<Success, NotFound, Error>> DeleteEmployee(long userId)
    {
         var user = await _context.Users
            .Where(p => p.UserType == (int)UserType.Employee && p.Id == userId)
            .FirstOrDefaultAsync();

        if (user == null) return new NotFound();

        try {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
        catch (Exception) 
        {
            return new Error();
        }
        
        return new Success();
    }
}
