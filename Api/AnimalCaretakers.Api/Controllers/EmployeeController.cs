using AnimalCaretakers.Api.Extensions;
using AnimalCaretakers.Api.Models.Employers;
using AnimalCaretakers.Api.Services;
using AnimalCaretakers.Data.Enums;
using AnimalCaretakers.Paginations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AnimalCaretakers.Api.Controllers;

/// <summary>
/// Employee related endpoints
/// </summary>
[ApiController]
[Route("api/employers")]
public class EmployeeController : ControllerBase
{
    private readonly EmployeeService _employeeService;

    /// <summary>
    /// Constructor for EmployeeController with injected EmployeeService
    /// </summary>
    /// <param name="usersService">Injected service</param>
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
    /// Fetch employee by id without details informations
    /// Allowed for everybody
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>Employee details</returns>
    [HttpGet("public/{userId}")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DetailsModel))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<DetailsModel>> GetEmployeePublicInfo(long userId)
    {
        var result = await _employeeService.GetEmployee(userId, true, true);

        return result.Match<ActionResult>(p => Ok(p), p => NotFound());
    }

    /// <summary>
    /// Fetch employee by id with details informations
    /// Allowed only for recruiter
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>Employee details</returns>
    [HttpGet("{userId}")]
    [AuthorizeUserType(UserType.Recruiter)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DetailsModel))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<DetailsModel>> GetEmployee(long userId)
    {
        var result = await _employeeService.GetEmployee(userId, true, false);

        return result.Match<ActionResult>(p => Ok(p), p => NotFound());
    }

    /// <summary>
    /// Fetch details informations about currenty logged in employee
    /// Allowed only for employee
    /// </summary>
    /// <returns>Employee details</returns>
    [HttpGet("me")]
    [AuthorizeUserType(UserType.Employee)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DetailsModel))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<DetailsModel>> GetMyAccount()
    {
        var result = await _employeeService.GetEmployee(User.Id(), false, false);

        return result.Match<ActionResult>(p => Ok(p), p => NotFound());
    }

    /// <summary>
    /// Update employee details informations
    /// Allowed only for employee
    /// </summary>
    /// <returns></returns>
    [HttpPut]
    [AuthorizeUserType(UserType.Employee)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DetailsModel))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<DetailsModel>> UpdateMyAccount(UpdateModel form)
    {
        var result = await _employeeService.UpdateEmployee(User.Id(), form);
     
        return result.Match<ActionResult>(p => Accepted(p), p => NotFound());
    }

    /// <summary>
    /// Delete current logged employee.
    /// Allowed only for Employee.
    /// </summary>
    /// <returns>
    /// Returns 200 OK if the employee was successfully deleted. 
    /// Returns 404 Not Found if the employee was not found. 
    /// </returns>
    [HttpDelete]
    [AuthorizeUserType(UserType.Employee)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteEmployee()
    {
        var result = await _employeeService.DeleteEmployee(User.Id());

         return result.Match<IActionResult>(
            success => Ok(),
            notFound => NotFound()
        );
    }
}