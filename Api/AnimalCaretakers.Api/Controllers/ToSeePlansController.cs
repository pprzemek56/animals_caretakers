using AnimalCaretakers.Api.Extensions;
using AnimalCaretakers.Api.Models.Employers;
using AnimalCaretakers.Api.Models.ToSeePlans;
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
[Route("api/to-see")]
[AuthorizeUserType(UserType.Recruiter)]
public class ToSeePlansController : ControllerBase
{
    private readonly ToSeePlansService _toSeePlansService;

    public ToSeePlansController(ToSeePlansService toSeePlansService)
    {
        _toSeePlansService = toSeePlansService;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Pagination<ListItemModel>))]
    public async Task<ActionResult<Pagination<ListItemModel>>> GetPlannedToSee([FromQuery] Pager pager, [FromQuery] FilterModel filter)
    {
        var result = await _toSeePlansService.GetPlannedToSee(User.Id(), pager, filter);

        return Ok(Pagination.FormT(result, pager.TotalRows ?? 0));
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DetailsModel))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<DetailsModel>> SavePlanToSee(CreateModel form)
    {
        var result = await _toSeePlansService.Create(User.Id(), form.EmployeeId.Value);

        return result.Match<ActionResult>(p => Ok(), p => BadRequest(p.Value));
    }

    [HttpDelete("{employeeId}")]
    [AuthorizeUserType(UserType.Employee)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeletePlanToSee(long employeeId)
    {
        var result = await _toSeePlansService.Delete(User.Id(), employeeId);

         return result.Match<IActionResult>(
            success => Ok(),
            notFound => NotFound()
        );
    }
}