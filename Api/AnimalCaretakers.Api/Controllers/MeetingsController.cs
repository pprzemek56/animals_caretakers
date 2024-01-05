using AnimalCaretakers.Api.Extensions;
using AnimalCaretakers.Api.Models.Meetings;
using AnimalCaretakers.Api.Services;
using AnimalCaretakers.Data.Enums;
using AnimalCaretakers.Paginations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AnimalCaretakers.Api.Controllers;

/// <summary>
/// Meetings related endpoints
/// </summary>
[ApiController]
[Route("api/meetings")]
public class MeetingsController : ControllerBase
{
    private readonly MeetingsService _meetingsService;

    public MeetingsController(MeetingsService meetingsService)
    {
        _meetingsService = meetingsService;
    }

    /// <summary>
    /// Filters, paginates and sort meetings by given params. Allowed for authorized user of any type.
    /// </summary>
    /// <param name="pager">Pager and sorting info</param>
    /// <param name="filter">Filters info</param>
    /// <returns>List of meetings currently logged user's</returns>
    [HttpGet]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<Pagination<ListItemModel>>> GetMeetings([FromQuery] Pager pager, [FromQuery] FilterModel filter)
    {
        var result = await _meetingsService.GetMyMeetings(User, pager, filter);

        return Ok(Pagination.FormT(result, pager.TotalRows ?? 0));
    }

    /// <summary>
    /// Creates new meeting. Allowed only for recruiter
    /// </summary>
    /// <param name="form">Info about new meeting</param>
    /// <returns>Ok or bad request in case of error</returns>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [AuthorizeUserType(UserType.Recruiter)]
    public async Task<ActionResult> CreateMeeting(CreateModel form)
    {
        var result = await _meetingsService.Create(User.Id(), form);

        return result.Match<ActionResult>(p => Ok(), p => BadRequest(p.Value));
    }

    /// <summary>
    /// Updates status of meeting to canceled
    /// </summary>
    /// <param name="meetingId">Id of meeting to update</param>
    /// <returns>Ok or Not found response</returns>
    [HttpPut("{meetingId}/cancel")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Cancel(long meetingId)
    {
        var result = await _meetingsService.UpdateStatus(meetingId, MeetingStatus.Canceled);

        return result.Match<IActionResult>(
            success => Ok(),
            err => NotFound()
        );
    }

    /// <summary>
    /// Updates status of meeting to finished
    /// </summary>
    /// <param name="meetingId">Id of meeting to update</param>
    /// <returns>Ok or Not found response</returns>
    [HttpPut("{meetingId}/finish")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Finish(long meetingId)
    {
        var result = await _meetingsService.UpdateStatus(meetingId, MeetingStatus.Finished);

        return result.Match<IActionResult>(
            success => Ok(),
            err => NotFound()
       );
    }
}