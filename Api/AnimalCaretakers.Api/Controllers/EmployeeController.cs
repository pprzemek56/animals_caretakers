using AnimalCaretakers.Api.Extensions;
using AnimalCaretakers.Api.Models.Employers;
using AnimalCaretakers.Api.Services;
using AnimalCaretakers.Data.Enums;
using AnimalCaretakers.Data.Models;
using AnimalCaretakers.Paginations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AnimalCaretakers.Api.Controllers;

[ApiController]
[Route("api/employers")]
public class EmployeeController : ControllerBase
{
    private readonly EmployeeService _employeeService;

    public EmployeeController(EmployeeService usersService)
    {
        _employeeService = usersService;
    }

    /// <summary>
    /// Filters employers and returns list of them (only basic informations)
    /// Allowed for everybody
    /// </summary>
    /// <param name="pager">Pagination params</param>
    /// <param name="filter">Filtering params</param>
    /// <returns>Paginated and filtered employers list</returns>
    [HttpGet]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Pagination<ListItemModel>))]
    public async Task<ActionResult<Pagination<ListItemModel>>> GetEmployers([FromQuery] Pager pager, [FromQuery] FilterModel filter)
    {
        var result = await _employeeService.GetEmployers(pager, filter);

        return Ok(Pagination.FormT(result, pager.TotalRows ?? 0));
    }

    /// <summary>
    /// Fetch employee by id with details informations
    /// Allowed only for recruiter
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>Employee details</returns>
    [HttpGet("{userId}")]
    [AuthorizeUserType(UserType.Recruiter)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Pagination<ListItemModel>))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<DetailsModel>> GetEmployee(long userId)
    {
        var result = await _employeeService.GetEmployee(userId);

        if (result == null)
            return NotFound();

        return Ok(result);
    }

    /// <summary>
    /// Fetch details informations about currenty logged in employee
    /// Allowed only for employee
    /// </summary>
    /// <returns>Employee details</returns>
    [HttpGet("me")]
    [AuthorizeUserType(UserType.Employee)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Pagination<ListItemModel>))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Pagination<ListItemModel>>> GetMyAccount()
    {
        var result = await _employeeService.GetEmployee(User.Id());

        if (result == null)
            return NotFound();

        return Ok(result);
    }

    /// <summary>
    /// Update employee details informations
    /// Allowed only for employee
    /// </summary>
    /// <returns></returns>
    [HttpPut]
    [AuthorizeUserType(UserType.Employee)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Pagination<ListItemModel>))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<DetailsModel>> UpdateMyAccount(UpdateModel form)
    {
        var result = await _employeeService.UpdateEmployee(User.Id(), form);
     
        return result.Match<ActionResult>(p => Accepted(p), p => NotFound());
    }
}