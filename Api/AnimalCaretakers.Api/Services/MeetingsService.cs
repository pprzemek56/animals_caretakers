using AnimalCaretakers.Api.Extensions;
using AnimalCaretakers.Api.Models.Meetings;
using AnimalCaretakers.Data;
using AnimalCaretakers.Data.Enums;
using AnimalCaretakers.Data.Models;
using AnimalCaretakers.Paginations;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OneOf;
using OneOf.Types;
using System.Security.Claims;

namespace AnimalCaretakers.Api.Services;

public class MeetingsService
{
    private readonly DataContext _context;

    public MeetingsService(DataContext context)
    {
        _context = context;
    }

    public async Task<OneOf<Success, Error<string>>> Create(long userId, CreateModel form)
    {
        var employeeExists = await _context.Users
            .AnyAsync(p => p.Id == form.EmployeeId.Value && p.UserType == (int)UserType.Employee);

        if (!employeeExists)
            return new Error<string>("Wybrany pracownik nie istnieje");

        _context.Add(new MeetingInvitation
        {
            RecruiterId = userId,
            EmployeeId = form.EmployeeId.Value,
            MeetingDate = form.MeetingDate.Value,
            StatusEnum = MeetingStatus.New,
        });

        await _context.SaveChangesAsync();

        return new Success();
    }

    public async Task<List<ListItemModel>> GetMyMeetings(ClaimsPrincipal user, Pager pager, FilterModel filter)
    {
        var query = _context.MeetingInvitations
            .AsNoTracking();

        if (user.HasRole(UserType.Employee))
            query = query.Where(p => p.EmployeeId == user.Id());
        else if(user.HasRole(UserType.Recruiter))
            query = query.Where(p => p.RecruiterId == user.Id());

        query = query.Filter(filter).Paginate(pager);

        IQueryable<ListItemModel> result = null;

        if (user.HasRole(UserType.Employee))
        {
            result = query.Select(p => new ListItemModel
            {
                Id = p.Id,
                GivenName = p.Recruiter.GivenName,
                Surname = p.Recruiter.Surname,
                MeetingDate = p.MeetingDate,
                Status = (MeetingStatus)p.Status
            });
        }
        else if (user.HasRole(UserType.Recruiter))
        {
            result = query.Select(p => new ListItemModel
            {
                Id = p.Id,
                GivenName = p.Employee.GivenName,
                Surname = p.Employee.Surname,
                MeetingDate = p.MeetingDate,
                Status = (MeetingStatus)p.Status
            });
        }

        return await result.ToListAsync();
    }

    public async Task<OneOf<Success, NotFound>> UpdateStatus(long meetingId, MeetingStatus newStatus)
    {
        var entity = await _context.MeetingInvitations.FindAsync(meetingId);

        if (entity == null)
            return new NotFound();

        entity.StatusEnum = newStatus;

        await _context.SaveChangesAsync();

        return new Success();
    }
}