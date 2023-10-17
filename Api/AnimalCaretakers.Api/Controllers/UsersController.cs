using AnimalCaretakers.Api.Extensions;
using AnimalCaretakers.Api.Models.Users;
using AnimalCaretakers.Api.Services;
using AnimalCaretakers.Data.Enums;
using AnimalCaretakers.Paginations;
using Microsoft.AspNetCore.Mvc;

namespace AnimalCaretakers.Api.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly UsersService _usersService;

    public UsersController(UsersService usersService)
    {
        _usersService = usersService;
    }

    [HttpGet]
    [AuthorizeUserType(UserType.Recruiter)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Pagination<ListItemModel>))]
    public async Task<Pagination<ListItemModel>> GetUsers([FromQuery] Pager pager, [FromQuery] FilterModel form)
    {
        var result = await _usersService.GetUsers(pager, form);

        return Pagination.FormT(result, pager.TotalRows ?? 0);
    }
}