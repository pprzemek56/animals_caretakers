using AnimalCaretakers.Api.Extensions;
using AnimalCaretakers.Api.Models.Users;
using AnimalCaretakers.Data;
using AnimalCaretakers.Paginations;
using Microsoft.EntityFrameworkCore;

namespace AnimalCaretakers.Api.Services;

public class UsersService
{
    private readonly DataContext _context;

    public UsersService(DataContext context)
    {
        _context = context;
    }

    public async Task<List<ListItemModel>> GetUsers(Pager pager, FilterModel filter)
    {
        return await _context.Users
            .AsNoTracking()
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
}
